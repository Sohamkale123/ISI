/* BIS Intelligence — shared multi-page interactions.
   Kept separate from the original homepage script so existing
   homepage behavior remains intact. */
(function () {
  'use strict';

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function initActiveNav() {
    var current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (current === 'compliance.html') current = 'compliance-assistant.html';
    document.querySelectorAll('.nav-pill[href]').forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('?')[0].split('#')[0].toLowerCase();
      var active = href === current;
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function initButtons() {
    document.querySelectorAll('[data-link]').forEach(function (el) {
      el.addEventListener('click', function () { window.location.href = el.getAttribute('data-link'); });
    });
  }

  var standards = [
    {number:'IS 302 (Part 1):2008', title:'Safety of Household and Similar Electrical Appliances', category:'Electrical appliances', status:'Active', desc:'General safety requirements for household and similar electrical appliances.', related:'IS 302 Part 2 series', keywords:'electrical appliance heater iron mixer household'},
    {number:'IS 456:2000', title:'Plain and Reinforced Concrete — Code of Practice', category:'Cement & construction', status:'Active', desc:'Code of practice covering plain and reinforced concrete construction.', related:'IS 10262, IS 383', keywords:'cement concrete construction'},
    {number:'IS 1786:2008', title:'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement', category:'Steel products', status:'Active', desc:'Requirements for high-strength deformed steel bars and wires used for reinforcement.', related:'IS 432, IS 2502', keywords:'steel bars reinforcement tmt'},
    {number:'IS 9845:1998', title:'Determination of Overall Migration of Constituents of Plastics to Foodstuffs', category:'Food packaging', status:'Active', desc:'Method for determining overall migration from plastics intended for contact with food.', related:'IS 10146', keywords:'food packaging plastic food contact'},
    {number:'IS 10500:2012', title:'Drinking Water — Specification', category:'Water', status:'Active', desc:'Specification for drinking water quality parameters and limits.', related:'IS 3025 series', keywords:'drinking water potable water'},
    {number:'IS 9873 (Part 1):2012', title:'Safety of Toys — Safety Aspects Related to Mechanical and Physical Properties', category:'Toys', status:'Revised', desc:'Safety requirements for toys covering mechanical and physical hazards.', related:'IS 9873 series', keywords:'toys children safety'},
    {number:'IS 2925:1984', title:'Industrial Safety Helmets', category:'Personal protective equipment', status:'Active', desc:'Requirements for industrial safety helmets and associated performance tests.', related:'IS 4770', keywords:'helmet safety head protection'}
  ];

  var labs = [
    {id:'8102006',name:'Shriram Institute For Industrial Research (SIIR), Delhi',city:'New Delhi',state:'Delhi',status:'BIS recognized lab; verify current scope before selection',standards:'Multi-disciplinary scope',tests:'Testing scope available through BIS LIMS',distance:'—',type:'Multi-disciplinary',lat:28.6139,lng:77.2090,address:'19-University Road, Delhi 110007',source:'BIS LIMS'},
    {id:'8138306',name:'Testtex India Laboratories Private Limited, Noida',city:'Noida',state:'Uttar Pradesh',status:'BIS recognized lab; verify current scope before selection',standards:'Scope varies by laboratory listing',tests:'Testing scope available through BIS LIMS',distance:'—',type:'Materials / Products',lat:28.5355,lng:77.3910,address:'C-57, Sector-65, Noida, Gautam Buddha Nagar, Uttar Pradesh 201301',source:'BIS LIMS'},
    {id:'6126316',name:'Intertek India Private Limited (Food Services), Hyderabad',city:'Hyderabad',state:'Telangana',status:'BIS recognized lab; verify current scope before selection',standards:'Food services scope',tests:'Food-related testing scope available through BIS LIMS',distance:'—',type:'Food',lat:17.3850,lng:78.4867,address:'IDA Phase-1, Jeedimetla, Hyderabad, Telangana 500055',source:'BIS LIMS'},
    {id:'8125636',name:'Kailtech Test and Research Centre Pvt. Ltd., Indore',city:'Indore',state:'Madhya Pradesh',status:'BIS recognized lab; verify current scope before selection',standards:'Testing and research scope',tests:'Testing scope available through BIS LIMS',distance:'—',type:'Testing & Research',lat:22.7196,lng:75.8577,address:'141C, Electronic Complex Industrial Area, Indore 452010',source:'BIS LIMS'},
    {id:'9164606',name:'JBS Testing Solutions Pvt Ltd, Jalandhar',city:'Jalandhar',state:'Punjab',status:'BIS recognized lab; verify current scope before selection',standards:'Testing scope available through BIS LIMS',tests:'Product testing scope available through BIS LIMS',distance:'—',type:'Testing',lat:31.3260,lng:75.5762,address:'Transport Nagar, Jalandhar, Punjab 144004',source:'BIS LIMS'},
    {id:'5137936',name:'Quality Control Division, S. M. Consultants Private Limited, Bhubaneswar',city:'Bhubaneswar',state:'Odisha',status:'BIS recognized lab; verify current scope before selection',standards:'Testing scope available through BIS LIMS',tests:'Quality control testing',distance:'—',type:'Materials / Quality',lat:20.2961,lng:85.8245,address:'Mancheswar Industrial Estate, Bhubaneswar, Odisha 751010',source:'BIS LIMS'},
    {id:'6120526',name:'UL India Private Limited, Bengaluru',city:'Bengaluru',state:'Karnataka',status:'BIS recognized lab; verify current scope before selection',standards:'Product testing scope',tests:'Testing scope available through BIS LIMS',distance:'—',type:'Electrical / Products',lat:12.9716,lng:77.5946,address:'Whitefield / Bengaluru industrial areas, Karnataka 560066',source:'BIS LIMS'},
    {id:'8131406',name:'Delhi Test House, Azadpur',city:'New Delhi',state:'Delhi',status:'BIS recognized lab; verify current scope before selection',standards:'Testing scope available through BIS LIMS',tests:'Product testing scope',distance:'—',type:'Testing',lat:28.7041,lng:77.1025,address:'A-62/3 GT Karnal Road Industrial Area, Azadpur, Delhi 110033',source:'BIS LIMS'},
    {id:'5123904',name:'National Test House (NTH), Alipore, Kolkata',city:'Kolkata',state:'West Bengal',status:'BIS recognized lab; verify current scope before selection',standards:'National Test House scope',tests:'Testing scope available through BIS LIMS',distance:'—',type:'Government / Testing',lat:22.5726,lng:88.3639,address:'11/1 Judges Court Road, Alipore, Kolkata 700027',source:'BIS LIMS'},
    {id:'6167704',name:'Central Leather Research Institute (CSIR-CLRI), Chennai',city:'Chennai',state:'Tamil Nadu',status:'BIS recognized lab; verify current scope before selection',standards:'Leather-related scope',tests:'Testing scope available through BIS LIMS',distance:'—',type:'Leather / Research',lat:13.0827,lng:80.2707,address:'Sardar Patel Road, Adyar, Chennai 600020',source:'BIS LIMS'},
    {id:'5169204',name:'National Test House (NER), Guwahati',city:'Guwahati',state:'Assam',status:'BIS recognized lab; verify current scope before selection',standards:'National Test House scope',tests:'Testing scope available through BIS LIMS',distance:'—',type:'Government / Testing',lat:26.1445,lng:91.7362,address:'C.I.T.I Complex, Gopinath Nagar, Guwahati 781016',source:'BIS LIMS'},
    {id:'6169806',name:'Viridian Testing Laboratories LLP, Tiruppur',city:'Tiruppur',state:'Tamil Nadu',status:'BIS recognized lab; verify current scope before selection',standards:'Testing scope available through BIS LIMS',tests:'Product testing scope',distance:'—',type:'Testing',lat:11.1085,lng:77.3411,address:'PN Road, Tiruppur, Tamil Nadu 641602',source:'BIS LIMS'},
    {id:'6183606',name:'Ramco Research and Development Centre, Chennai',city:'Chennai',state:'Tamil Nadu',status:'BIS recognized lab; verify current scope before selection',standards:'Cement / materials related scope',tests:'Testing scope available through BIS LIMS',distance:'—',type:'Materials / Research',lat:12.9249,lng:80.2326,address:'Okkiyam, Thoraipakkam, Chennai 600097',source:'BIS LIMS'},
    {id:'7119516',name:'Konark Research Foundation, Daman',city:'Daman',state:'Dadra and Nagar Haveli and Daman and Diu',status:'BIS recognized lab; verify current scope before selection',standards:'Testing scope available through BIS LIMS',tests:'Testing scope available through BIS LIMS',distance:'—',type:'Testing & Research',lat:20.3974,lng:72.8328,address:'Kachigam, Daman 396210',source:'BIS LIMS'},
    {id:'7167306',name:'HEXIQON Laboratory Private Limited, Ahmedabad',city:'Ahmedabad',state:'Gujarat',status:'BIS recognized lab; verify current scope before selection',standards:'Testing scope available through BIS LIMS',tests:'Laboratory testing scope',distance:'—',type:'Testing',lat:23.0225,lng:72.5714,address:'Gota, Ahmedabad, Gujarat 382481',source:'BIS LIMS'},
    {id:'8100924',name:'Central Power Research Institute (CPRI), Bhopal',city:'Bhopal',state:'Madhya Pradesh',status:'BIS recognized lab; verify current scope before selection',standards:'Power/electrical scope',tests:'Electrical and power testing scope',distance:'—',type:'Electrical / Power',lat:23.2599,lng:77.4126,address:'Govindpura, Bhopal 462023',source:'BIS LIMS'},
    {id:'9102534',name:'CIPET, Lucknow',city:'Lucknow',state:'Uttar Pradesh',status:'BIS recognized lab; verify current scope before selection',standards:'Polymer / product testing scope',tests:'Testing scope available through BIS LIMS',distance:'—',type:'Plastics / Testing',lat:26.8467,lng:80.9462,address:'Amausi Industrial Area, Lucknow 226008',source:'BIS LIMS'},
    {id:'6141334',name:'CIPET, Vijayawada',city:'Vijayawada',state:'Andhra Pradesh',status:'BIS recognized lab; verify current scope before selection',standards:'Polymer / product testing scope',tests:'Testing scope available through BIS LIMS',distance:'—',type:'Plastics / Testing',lat:16.5062,lng:80.6480,address:'Surampalli, Gannavaram, Vijayawada, Andhra Pradesh 521212',source:'BIS LIMS'},
    {id:'6178726',name:'Standard Testing and Compliance Private Limited, Faridabad',city:'Faridabad',state:'Haryana',status:'BIS recognized lab; verify current scope before selection',standards:'Testing and compliance scope',tests:'Testing scope available through BIS LIMS',distance:'—',type:'Testing / Compliance',lat:28.4089,lng:77.3178,address:'Mathura Road, Faridabad, Haryana 121008',source:'BIS LIMS'},
    {id:'6133034',name:'Regional Reference Standards Laboratory, Bengaluru',city:'Bengaluru',state:'Karnataka',status:'BIS empanelled lab; verify current scope before selection',standards:'Reference standards scope',tests:'Reference standards services',distance:'—',type:'Reference Standards',lat:13.0820,lng:77.5940,address:'Jakkur, Bengaluru, Karnataka 560064',source:'BIS LIMS'},
    {id:'6107934',name:'Central Coir Research Institute, Alappuzha',city:'Alappuzha',state:'Kerala',status:'BIS empanelled lab; verify current scope before selection',standards:'Coir-related scope',tests:'Testing/research scope',distance:'—',type:'Research / Testing',lat:9.4981,lng:76.3388,address:'Coir Board Complex, Kalavoor, Alappuzha 688522',source:'BIS LIMS'}
  ];

  function standardCard(s) {
    return '<article class="result-card page-card hoverable" data-search="'+esc((s.number+' '+s.title+' '+s.category+' '+s.keywords).toLowerCase())+'">' +
      '<div class="flex-between"><div><div class="std-number">'+esc(s.number)+'</div><h3>'+esc(s.title)+'</h3></div><span class="tag tag-hi">'+esc(s.status)+'</span></div>' +
      '<div class="result-meta"><span class="tag tag-neutral">'+esc(s.category)+'</span><span class="tag tag-primary">Evidence-linked</span></div>' +
      '<p>'+esc(s.desc)+'</p><div class="meta-row"><div class="meta-cell"><div class="k">Related</div><div class="v">'+esc(s.related)+'</div></div><div class="meta-cell"><div class="k">Source</div><div class="v">Official BIS</div></div></div>' +
      '<div class="page-actions"><a class="btn btn-secondary btn-sm" href="evidence.html?is='+encodeURIComponent(s.number)+'">View Evidence</a><a class="btn btn-primary btn-sm" href="compliance-assistant.html?standard='+encodeURIComponent(s.number)+'">Check Compliance</a></div></article>';
  }

  function initFindPage() {
    var form = document.getElementById('standardsSearchForm');
    if (!form) return;
    var input = document.getElementById('standardsSearch');
    var category = document.getElementById('standardsCategory');
    var grid = document.getElementById('standardsResults');
    var count = document.getElementById('standardsCount');
    var empty = document.getElementById('standardsEmpty');
    function render() {
      var q=(input.value||'').trim().toLowerCase(), c=(category.value||'').toLowerCase();
      var matches=standards.filter(function(s){ return (!q || (s.number+' '+s.title+' '+s.category+' '+s.keywords).toLowerCase().indexOf(q)>-1) && (!c || s.category.toLowerCase()===c); });
      grid.innerHTML=matches.map(standardCard).join('');
      count.textContent=matches.length+' standard'+(matches.length===1?'':'s')+' found';
      empty.hidden=matches.length>0;
    }
    form.addEventListener('submit',function(e){e.preventDefault();render();});
    document.querySelectorAll('[data-standard-query]').forEach(function(chip){chip.addEventListener('click',function(){input.value=chip.dataset.standardQuery;render();});});
    render();
  }

  function initCompliancePage() {
    var form=document.getElementById('complianceFormNew'); if(!form) return;
    var result=document.getElementById('complianceDashboard');
    var scoreEl=document.getElementById('scoreValue');
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var product=(document.getElementById('productName').value||'Product').trim();
      var desc=(document.getElementById('productDescription').value||'').toLowerCase();
      var match=/electrical|appliance|heater|mixer|iron/.test(desc+' '+product.toLowerCase()) ? standards[0] : (/steel|tmt/.test(desc+' '+product.toLowerCase()) ? standards[2] : standards[3]);
      var score=/electrical|steel|plastic|food/.test(desc+' '+product.toLowerCase())?78:61;
      scoreEl.textContent=score+'%';
      result.innerHTML='<div class="analysis-grid"><div><span class="tag tag-hi">High-confidence demo match</span><h3>'+esc(match.number)+' — '+esc(match.title)+'</h3><p>Potentially applicable based on the product information supplied. Verify the latest official BIS applicability before making a certification decision.</p><div class="analysis-list"><div><b>Certification required</b><span>Depends on product and applicable scheme</span></div><div><b>Certification type</b><span>Product-specific BIS conformity pathway</span></div><div><b>Testing</b><span>Review the applicable standard test methods</span></div><div><b>Documents</b><span>Technical, manufacturing and business records</span></div><div><b>Laboratory</b><span>Select a suitable recognized laboratory</span></div></div></div><div class="score-panel"><div class="score-ring"><span>'+score+'%</span></div><div class="score-caption">Compliance Score</div><p>Demo score based on completeness of the supplied product information.</p></div></div>';
      document.getElementById('analysisSection').scrollIntoView({behavior:'smooth'});
    });
  }

  function initEvidencePage() {
    var input=document.getElementById('evidenceSearch'); if(!input) return;
    var cards=[].slice.call(document.querySelectorAll('.evidence-card'));
    function filter(){var q=input.value.toLowerCase().trim();cards.forEach(function(c){c.hidden=q && c.innerText.toLowerCase().indexOf(q)===-1;});document.getElementById('evidenceEmpty').hidden=cards.some(function(c){return !c.hidden;});}
    input.addEventListener('input',filter);
    document.querySelectorAll('[data-evidence]').forEach(function(btn){btn.addEventListener('click',function(){openEvidence(btn.dataset.evidence);});});
    document.querySelectorAll('[data-close-modal]').forEach(function(b){b.addEventListener('click',closeEvidence);});
    document.getElementById('evidenceModal').addEventListener('click',function(e){if(e.target===this)closeEvidence();});
    function openEvidence(id){var data=document.getElementById(id);if(!data)return;document.getElementById('modalBody').innerHTML=data.innerHTML;document.getElementById('evidenceModal').classList.add('open');document.body.classList.add('modal-open');}
    function closeEvidence(){document.getElementById('evidenceModal').classList.remove('open');document.body.classList.remove('modal-open');}
  }

  function initLabsPage() {
    var form=document.getElementById('labSearchForm'); if(!form)return;
    var grid=document.getElementById('labResults'), empty=document.getElementById('labEmpty');
    var countEl=document.getElementById('labResultCount');
    var mapEl=document.getElementById('laboratoryMap'), selectedEl=document.getElementById('mapSelectedLab');
    var map=null, markers={}, currentId=null;
    var states=['','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry'];
    var stateSelect=document.getElementById('labState');
    if(stateSelect){
      stateSelect.innerHTML=states.map(function(x){return '<option value="'+esc(x)+'">'+esc(x||'All states')+'</option>';}).join('');
    }
    var typeSelect=document.getElementById('labType');
    if(typeSelect){
      var types=[''].concat(labs.map(function(x){return x.type;}).filter(function(v,i,a){return a.indexOf(v)===i;}));
      typeSelect.innerHTML=types.map(function(x){return '<option value="'+esc(x)+'">'+esc(x||'All types')+'</option>';}).join('');
    }

    function defaultSelected(){
      if(!selectedEl)return;
      selectedEl.innerHTML='<span class="tag tag-neutral">No laboratory selected</span><h3>Select a laboratory</h3><p>Click a marker or choose a laboratory from the results.</p><a class="btn btn-secondary btn-sm" href="https://lims.bis.gov.in/home/labs/" target="_blank" rel="noopener">Open Official BIS Directory</a>';
    }

    function selectLab(id,zoom){
      var l=labs.find(function(x){return x.id===id;}); if(!l)return;
      currentId=id;
      document.querySelectorAll('.lab-card').forEach(function(c){
        c.classList.toggle('lab-selected',c.dataset.labId===id);
      });
      if(selectedEl){
        selectedEl.innerHTML='<span class="tag tag-primary">Selected laboratory</span><h3>'+esc(l.name)+'</h3><p><b>Location:</b> '+esc(l.city)+', '+esc(l.state)+'</p><p><b>Address:</b> '+esc(l.address)+'</p><p><b>Type:</b> '+esc(l.type)+'</p><p><b>Standards / scope:</b> '+esc(l.standards)+'</p><p><b>Testing:</b> '+esc(l.tests)+'</p><p><b>Status:</b> '+esc(l.status)+'</p><div class="page-actions"><a class="btn btn-secondary btn-sm" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(l.lat+','+l.lng)+'">Get Directions</a><button class="btn btn-primary btn-sm" id="clearLab" type="button">Clear</button></div><small class="lab-source">Source: BIS LIMS listing; verify live scope before use.</small>';
      }
      if(map&&markers[id]){
        if(zoom)map.setView([l.lat,l.lng],10);
        markers[id].openPopup();
      }
      var clear=document.getElementById('clearLab');
      if(clear)clear.onclick=function(){
        currentId=null;
        document.querySelectorAll('.lab-card').forEach(function(c){c.classList.remove('lab-selected');});
        defaultSelected();
      };
    }

    function initMap(){
      if(!mapEl||typeof L==='undefined')return;
      map=L.map(mapEl,{scrollWheelZoom:true}).setView([22.9734,78.6569],5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom:19,
        attribution:'&copy; OpenStreetMap contributors'
      }).addTo(map);
      labs.forEach(function(l){
        var m=L.marker([l.lat,l.lng]);
        m.bindPopup('<div style="min-width:210px"><b>'+esc(l.name)+'</b><br><span style="color:#667085">'+esc(l.city)+', '+esc(l.state)+'</span><br><button type="button" class="map-popup-button" data-map-lab="'+esc(l.id)+'">View details</button></div>');
        m.on('click',function(){selectLab(l.id,false);});
        markers[l.id]=m;
      });
      setTimeout(function(){map.invalidateSize();},200);
    }

    function visibleLabs(){
      var q=(document.getElementById('labSearch').value||'').toLowerCase().trim();
      var state=(document.getElementById('labState').value||'').toLowerCase();
      var type=(document.getElementById('labType').value||'').toLowerCase();
      return labs.filter(function(l){
        var text=(l.name+' '+l.city+' '+l.state+' '+l.address+' '+l.standards+' '+l.tests+' '+l.type).toLowerCase();
        return (!q||text.indexOf(q)>-1)&&(!state||l.state.toLowerCase()===state)&&(!type||l.type.toLowerCase()===type);
      });
    }

    function syncMap(filtered){
      if(!map)return;
      Object.keys(markers).forEach(function(id){
        if(map.hasLayer(markers[id]))map.removeLayer(markers[id]);
      });
      filtered.forEach(function(l){markers[l.id].addTo(map);});
      if(filtered.length){
        var bounds=L.latLngBounds(filtered.map(function(l){return [l.lat,l.lng];}));
        if(filtered.length===1)map.setView([filtered[0].lat,filtered[0].lng],10);
        else map.fitBounds(bounds,{padding:[30,30],maxZoom:7});
      }else{
        map.setView([22.9734,78.6569],5);
      }
      setTimeout(function(){map.invalidateSize();},100);
    }

    function render(){
      var filtered=visibleLabs();
      if(countEl)countEl.textContent=filtered.length;
      grid.innerHTML=filtered.map(function(l){
        return '<article class="lab-card page-card hoverable" data-lab-id="'+esc(l.id)+'">'+
          '<div class="lab-card-head"><div class="lab-title"><h3>'+esc(l.name)+'</h3><p class="lab-location">'+esc(l.city)+', '+esc(l.state)+'</p></div><span class="tag tag-primary">BIS LIMS</span></div>'+
          '<div class="result-meta"><span class="tag tag-neutral">'+esc(l.standards)+'</span><span class="tag tag-neutral">'+esc(l.type)+'</span></div>'+
          '<div class="lab-lines"><p><b>Tests:</b> '+esc(l.tests)+'</p><p><b>Status:</b> '+esc(l.status)+'</p><p><b>Address:</b> '+esc(l.address)+'</p></div>'+
          '<div class="page-actions"><button class="btn btn-secondary btn-sm lab-details-btn" data-lab-id="'+esc(l.id)+'" type="button">View Details</button><button class="btn btn-primary btn-sm lab-select-btn" data-lab-id="'+esc(l.id)+'" type="button">Select Laboratory</button></div>'+
        '</article>';
      }).join('');
      empty.hidden=filtered.length>0;
      syncMap(filtered);
      if(currentId && !filtered.some(function(l){return l.id===currentId;})){
        currentId=null; defaultSelected();
      }
      document.querySelectorAll('.lab-details-btn,.lab-select-btn').forEach(function(btn){
        btn.onclick=function(){
          selectLab(btn.dataset.labId,true);
          if(selectedEl)selectedEl.scrollIntoView({behavior:'smooth',block:'center'});
        };
      });
    }

    form.addEventListener('submit',function(e){e.preventDefault();render();});
    initMap();
    render();
    document.addEventListener('click',function(e){
      var b=e.target.closest('[data-map-lab]');
      if(b){selectLab(b.dataset.mapLab,true);if(selectedEl)selectedEl.scrollIntoView({behavior:'smooth',block:'center'});}
    });
  }

  function initFaqPage(){
    var input=document.getElementById('faqSearch');if(!input)return;
    var items=[].slice.call(document.querySelectorAll('.faq-item'));
    function filter(){var q=input.value.toLowerCase().trim();items.forEach(function(i){i.hidden=q && i.innerText.toLowerCase().indexOf(q)===-1;});}
    input.addEventListener('input',filter);
    document.querySelectorAll('.faq-category').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.faq-category').forEach(function(x){x.classList.remove('active');});btn.classList.add('active');var cat=btn.dataset.category;items.forEach(function(i){i.hidden=cat!=='all'&&i.dataset.category!==cat;});input.value='';});});
  }

  document.addEventListener('DOMContentLoaded',function(){initActiveNav();initButtons();initFindPage();initCompliancePage();initEvidencePage();initLabsPage();initFaqPage();});
})();

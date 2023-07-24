const fields = [
    {
      label: 'Module',
      value: 'name'
    },
    {
      label: 'Version',
      value: 'latestVersion'
    },
    {
      label: 'Downloads',
      value: 'downloads'
    },
    {
      label: 'Last Release',
      value: 'modified'
    },
    {
      label: 'ESM/CJS',
      value: 'type'
    },
    {
      label: 'Review Level',
      value: 'reviewlevel'
    },
    {
      label: 'Activity Level(current)',
      value: 'activitycurrent'
    },
    {
      label: 'Activity Level(target)',
      value: 'activitytarget'
    },
    {
      label: 'Foundation',
      value: 'foundation'
    },
    {
      label: 'Description',
      value: 'description'
    },
    {
      label: 'Section',
      value: 'section'
    },
    {
      label: 'Git Link',
      value: 'repository'
    }
  ];

// create the table header
function createTableHeader () {
  // Get the table header
  const thead = document.querySelector('table thead');
  const tr = document.createElement('tr');
  tr.role = 'row';


  const fragment = new DocumentFragment();
  for (const field of fields) {
    const th = document.createElement('th');
    th.innerHTML = field.label;
    th.role = 'columnheader';
    th.scope = 'col';
    th.className = 'pf-m-width-max';
    fragment.append(th);
  }

  tr.appendChild(fragment);
  thead.appendChild(tr);
}

// create table rows
function createTableRows (moduleData) {
  // get the table body
  const tbody = document.querySelector('table tbody');

  // loop through the module data
  for (const data of moduleData) {
    // create a new row
    const tdFragment = new DocumentFragment();
    const tr = document.createElement('tr');
    tr.role = 'row';

    // Loop throught the fields to get the values we want
    for (const field of fields) {
      // create the td
      const td = document.createElement('td');
      if (field.value === 'name' || (field.value === 'foundation' && data[field.value])) {
        const a = document.createElement('a');
        a.href = data.npmlink;
        a.target = '_blanck';
        a.innerHTML = data[field.value]
        td.appendChild(a);
      } else if (field.value === 'modified') {
        td.innerHTML = moment(data[field.value]).format('MM/DD/YYYY');
      } else if (field.value === 'downloads') {
        td.innerHTML = new Intl.NumberFormat().format(data[field.value]);
      } else {
        td.innerHTML = data[field.value] || '';
      }
      td.role = 'cell';
      td['data-label'] = field.label;
      td.className = 'pf-m-width-max';
      tdFragment.append(td);
    }

    tr.appendChild(tdFragment)
    tbody.appendChild(tr);
  }
}

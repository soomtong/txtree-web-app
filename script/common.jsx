var txtreeData = {
    title: 'Txtree',
    version: '1.0',
    entryPoint: $("meta[name=hostname]").attr('content') + '/api/tree/'
};

var menuData = {
    menu1: [
        {
            title: 'Home',
            link: '/',
            active: true
        },
        {
            title: 'Curate',
            link: '/curate',
            active: false
        },
        {
            title: 'Favorite',
            link: '/favorite',
            active: false
        }
    ],
    menu2: [
        {
            title: 'Create New Document',
            link: '/create',
            active: false
        },
        {
            title: 'Search',
            link: '/search',
            active: false
        }
    ],
    menu3: [
        {
            title: 'About',
            link: '/about',
            active: false
        },
        {
            title: 'Bookmarklet',
            link: '/bookmarklet',
            active: false
        }
    ],
    menu4: [
        {
            title: 'Newest',
            link: '/newest'
        },
        {
            title: 'Hottest',
            link: '/hottest'
        },
        {
            title: 'Coldest',
            link: '/coldest'
        },
        {
            title: 'hr1'
        },
        {
            title: 'Oldest',
            link: '/oldest'
        }
    ],
    menuLink: function (active) {
        return active ? 'nav-link nav-link-active' : 'nav-link';
    }

};

var listData = {
    pageSize: 12,
    totalPage: 1,
    thisPage: 1,
    data: [
        {
            _id: "1",
            text: "Check api server status or No data exist there",
            title: "No Data Exist",
            created_at: Date.now()
        }
    ]
};

function range(start, edge, step) {
    // If only one number was passed in make it the edge and 0 the start.
    if (arguments.length == 1) {
        edge = start;
        start = 0;
    }

    // Validate the edge and step numbers.
    edge = edge || 0;
    step = step || 1;

    // Create the array of numbers, stopping befor the edge.
    for (var ret = []; (edge - start) * step >= 0; start += step) {
        ret.push(start);
    }
    return ret;
}

module.exports = {
    txtree: txtreeData,
    menu: menuData,
    list: listData,
    range: range
};
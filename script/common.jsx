var txtreeData = {
    title: 'Txtree',
    version: '1.0',
    entryPoint: 'http://localhost:3030/api/tree/',
    pageSize: 2
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
    totalPage: 1,
    thisPage: 1,
    data: [
        {
            _id: "1",
            text: "Check api server status",
            title: "No Server Connected",
            created_at: Date.now()
        }
    ]
};

var updateList = function (error, result) {
    console.log(result);
    if (error) {
        this.setState({
            page: {
                now: 0,
                total: listData.totalPage
            },
            list: listData.data
        });
    } else {
        var data = result.body.data;

        if (this.isMounted() && data.count !== 0) {
            this.setState({
                page: {
                    now: data.now,
                    total: data.total
                },
                list: data.list
            });
        } else {
            this.setState({
                page: {
                    now: 0,
                    total: listData.totalPage
                },
                list: listData.data
            });
        }
    }               // Calling the end function will send the request
};

module.exports = {
    txtree: txtreeData,
    menu: menuData,
    list: listData,
    updateList: updateList
};
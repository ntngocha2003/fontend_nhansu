const sidebar=[
    {
        icon :'bx bx-home-alt',
        name :'Dashboard'
    },
    {
        icon : 'bx bxs-user',
        name :'Quản lý nhân viên'
    },
    {
        icon : 'bx bxs-star',
        name :'Quản lý trình độ',
        router:'level.index'
    },
    {
        icon : 'bx bxs-star',
        name :'Quản lý chuyên ngành',
        router:'specialized.index'
    },
    {
        icon : 'bx bxs-star',
        name :'Quản lý chức vụ',
        router:'position.index'
    },
    {
        icon :'bx bxs-doughnut-chart',
        name :'Quản lý phòng ban',
        router:'department.index'
    },
    {
        icon : 'bx bxs-heart',
        name :'Quản lý lương',
        router:'salary.index'
    }
];
export default sidebar;
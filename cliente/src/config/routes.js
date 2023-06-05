// layout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';
import LayoutPersonal from '../layouts/LayoutPersonal';
import LayoutCliente from '../layouts/LayoutCliente';

//Admin PAges
import AdminHome from '../pages/Admin/Admin';
import AdminSingIn from '../pages/Admin/Signln';
import AdminUsers from '../pages/Admin/Users';


//pages Personal
import PersonalHome from '../pages/Personal';
import Bpaciente from '../pages//Personal/Bpaciente';
import VistaFicha from '../pages/Personal/VistFicha';
import CitProg from '../pages/Personal/CitaProgram';
import SolFLabo from '../pages/Personal/SolLaboratorio';
import SolRadio from '../pages/Personal/SolRadiografia';
//

//pages normal
import MainPage from '../pages/Home/PagPrincipal';

//pages cliente
import HomeCliente from '../pages/Cliente/HomeCliente';


//others
import Error404 from '../pages/Error404';
import SolLabo from '../pages/Personal/SolLaboratorio';


const routes = [
    {
        path:"/admin",
        component: LayoutAdmin,
        exact: false,
        routes:[
            {
                path:"/admin",
                component: AdminHome,
                exact: true
            },
            
            {
                path:"/admin/users",
                component: AdminUsers,
                exact: true
            },
            //siempre va al final
            {
                component: Error404
            }
        ]
    },
    //
    {
        path:"/personal",
        component: LayoutPersonal,
        exact: false,
        routes:[
            {
                path:"/personal",
                component: Bpaciente,
                exact: true
            },
            {
                path:"/personal/Bpaciente",
                component: Bpaciente,
                exact: true
            },
            {
                path:"/personal/VistaFicha",
                component: VistaFicha,
                exact: true
            },
            {
                path:"/personal/CitProg",
                component: CitProg,
                exact: true
            },
            {
                path:"/personal/SolRadio",
                component: SolRadio,
                exact: true
            },
            {
                path:"/personal/SolLAbo",
                component: SolLabo,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    //
    {
        path:"/cliente",
        component: LayoutCliente,
        exact: false,
        routes:[
            {
            path:"/cliente",
            component: HomeCliente,
            exact:true
            },
            {
                component: Error404
            }
        ]
    },
    //
    {
        path:"/login",
        component: AdminSingIn,
        exact: false,
        routes:[
            {
                path:"/login",
                component: AdminSingIn,
                exact: true
            },
            {
                component: Error404,
                
            }
        ]
    },
    {
        path:"/",
        component: LayoutBasic,
        exact: false,
        routes:[
            {
                path:"/",
                component: MainPage,
                exact: true
            },
            {
                path:"/home",
                component: MainPage,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }

];

export default routes;
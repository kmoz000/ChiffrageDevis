
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import {
  Menubar,
  // MenubarCheckboxItem,
  // MenubarContent,
  // MenubarItem,
  MenubarMenu,
  // MenubarRadioGroup,
  // MenubarRadioItem,
  // MenubarSeparator,
  // MenubarShortcut,
  // MenubarSub,
  // MenubarSubContent,
  // MenubarSubTrigger,
  MenubarTrigger,
} from "./components/ui/menubar"
import Main from './pages/main';
import { FaMinus, FaPlus, FaWindowClose } from 'react-icons/fa';
import { appWindow } from '@tauri-apps/api/window';
import Chiffrage from './pages/Chiffrage';
import Devis from './pages/Devis';
import { Toaster } from "@/components/ui/sonner"
function Layout() {
  // const [] = useMatch("/")
  return (<div className='kmoz-fade-in-5 kmoz-flex kmoz-flex-col kmoz-overflow-hidden'>
    <Menubar className="kmoz-px-2 kmoz-max-h-20" data-tauri-drag-region onDoubleClick={() => appWindow.toggleMaximize()}>
      <MenubarMenu>
        <MenubarTrigger className="kmoz-cursor-pointer"><NavLink to={"/"}>Articles</NavLink></MenubarTrigger>
        {/* <MenubarContent>
            <MenubarItem>
              New <MenubarShortcut>⌘A</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Import/Export</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Share</MenubarItem>
                <MenubarItem>Import CSV</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent> */}
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="kmoz-cursor-pointer"><NavLink to={"/Chiffrage"}>Chiffrage</NavLink></MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="kmoz-cursor-pointer"><NavLink to={"/Devis"}>Devis</NavLink></MenubarTrigger>
      </MenubarMenu>
      {/* <MenubarMenu>
          <MenubarTrigger></MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>Edit...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Add Profile...</MenubarItem>
          </MenubarContent>
        </MenubarMenu> */}
      <div className="kmoz-top-2 kmoz-right-1 kmoz-absolute kmoz-flex kmoz-flex-row kmoz-gap-2">
        <FaMinus onClick={() => appWindow.minimize()} size={15} className='kmoz-p-1 kmoz-scale-100 active:kmoz-scale-95 kmoz-bg-slate-400 kmoz-rounded-full kmoz-text-white kmoz-transition-transform' />
        <FaPlus onClick={() => appWindow.maximize()} className='kmoz-p-1 kmoz-scale-100 active:kmoz-scale-95 kmoz-bg-blue-600 kmoz-rounded-full kmoz-text-white kmoz-transition-transform' />
        <FaWindowClose onClick={() => appWindow.close()} className='kmoz-p-1 kmoz-scale-100 active:kmoz-scale-95 kmoz-bg-red-700 kmoz-rounded-full kmoz-text-white kmoz-transition-transform' />
      </div>
    </Menubar>
    <main className='flex-1'>
      <Outlet />
      <ScrollRestoration />
    </main>
    <Toaster />
  </div>)
}
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      }
      ,
      {
        path: "/Chiffrage",
        element: <Chiffrage />,
      },
      {
        path: "/Devis",
        element: <Devis />,
      },
    ]
  },
]);
function App() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  )
}

export default App

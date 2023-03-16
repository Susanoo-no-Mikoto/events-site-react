import { Routes, Route } from 'react-router-dom';

//layots
import MainLayout from './layouts/MainLayout';

//pages
import Home from './pages/Home';
import Events from './pages/Events';
import Contacts from './pages/Contacts';
import NotFound from './pages/NotFound';
import FullEvent from './pages/FullEvent';
import AddEvent from './pages/AddEvent';
import PersonalData from './pages/PersonalData';
import Registration from './pages/Registration';

//private routes
import PrivateRoutesAdmin from './utils/router/PrivateRoutesAdmin';
import PrivateRoutesAuthUser from './utils/router/PrivateRoutesAuthUser';
import PrivateRoutesModerAndAdmin from './utils/router/PrivateRoutesModerAndAdmin';

//styles
import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="list/:id" element={<FullEvent />} />

        <Route path="events" element={<Events />} />
        <Route path="events/list/:id" element={<FullEvent />} />

        <Route path="contacts" element={<Contacts />} />

        <Route element={<PrivateRoutesModerAndAdmin />}>
          <Route path="add-event" element={<AddEvent />} />
        </Route>

        <Route element={<PrivateRoutesAdmin />}>
          <Route path="registration" element={<Registration />} />
        </Route>

        <Route element={<PrivateRoutesAuthUser />}>
          <Route path="personalData" element={<PersonalData />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

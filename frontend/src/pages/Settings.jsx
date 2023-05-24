// IMPORT COMPONENTS
import AuthSettingsComponent from '../components/Settings/AuthSettingsComponent';
import DeleteAccountComponent from '../components/Settings/DeleteAccountComponent';
import SignOutComponent from '../components/Settings/SignOutComponent';
import BackBtnComponent from '../components/GoBackBtnComponent/BackBtnComponent';
import Navbar from '../components/Navbar/Navbar';


const Settings = () => {
    return (
        <>
            <Navbar />
            <div className="pink-background centered-content-column">

                <div className="settings">
                    <BackBtnComponent />
                    <h1>Settings</h1>
      
                    <AuthSettingsComponent />
                    <DeleteAccountComponent />
                    <SignOutComponent />
                </div>
            </div>
        </>
    );
}

export default Settings;
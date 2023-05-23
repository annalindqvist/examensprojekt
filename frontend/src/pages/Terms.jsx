// IMPORT COMPONENTS
import BackBtnComponent from "../components/GoBackBtnComponent/BackBtnComponent";

const Terms = () => {

    return (
        <div className="centered-content-column full-screen-content dark-background white-text">
            <div className="terms flex">
                <div className="terms-back">
                    <BackBtnComponent />
                </div>
                <h1 className="dark-text lily-font l-text">GalVibes terms</h1>
                <p className="black-text s-text">
                    Welcome to GalVibe, a school project designed by Anna Linqvist to provide a platform for women/girls to connect with each other through chat and public posts. Before you proceed to use this application, we kindly ask you to carefully read and understand the following terms and conditions. By accessing or using this application, you acknowledge that you have read, understood, and agreed to be bound by these terms.
                    <br></br>
                    <br></br>
                    <span className="m-weight">Purpose and Scope:</span>
                    <br></br>
                    GalVibe is a school project intended solely for educational purposes, specifically for study cases. The information registered within the application will not be used for any other purpose beyond these educational objectives.
                    <br></br>
                    <br></br>
                    <span className="m-weight">Data Collection and Storage:</span>
                    <br></br>
                    To provide you with a seamless user experience, I collect and store certain information that you voluntarily provide during the registration process. This information includes your name, age, email address, city and any other details you choose to share. We assure you that all personal information will be handled with care and stored securely in a MongoDB database.
                    <br></br>
                    <br></br>
                    <span className="m-weight">User Responsibility:</span>
                    <br></br>
                    You are responsible for maintaining the confidentiality of your account login credentials. Any activities that occur under your account will be your sole responsibility. You agree to notify me immediately of any unauthorized use or breach of security related to your account.
                    <br></br>
                    <br></br>
                    <span className="m-weight">User Conduct:</span>
                    <br></br>
                    While using GalVibe, you agree to abide by the following guidelines:

                    Respect the privacy and personal information of other users.
                    Refrain from engaging in any form of harassment, discrimination, or offensive behavior.
                    Use the application solely for its intended purpose of connecting with other women/girls and sharing public posts.
                    Do not share any illegal, harmful, or explicit content.
                    Refrain from engaging in any activity that may disrupt or interfere with the proper functioning of the application.
                    <br></br>
                    <br></br>
                    <span className="m-weight">Modifications to the Terms:</span>
                    <br></br>
                    I reserve the right to modify or update these terms and conditions at any time without prior notice. It is your responsibility to review the terms periodically. By continuing to use the application, you accept any modifications made to the terms.
                    <br></br>
                    <br></br>
                    <span className="m-weight">Termination:</span>
                    <br></br>
                    We reserve the right to terminate or suspend your access to GalVibe at any time, without prior notice or liability, for any reason including, but not limited to, a breach of these terms.
                </p>
            </div>
        </div>
    );
};

export default Terms;

import '@/app/globals.css';

const MaintenancePage = () => {
  return (
    <div className="maintenance.container">
      <main className="maintenance.main">
        <h1 className="maintenance.title">
          We'll be back soon!
        </h1>

        <p className="maintenance.description">
          Our application is currently undergoing scheduled maintenance. We apologize for the inconvenience and appreciate your patience. We'll be back up and running as soon as possible!
        </p>

        <p className="maintenance.description">
          Please check back later or follow our social media channels for updates.
        </p>
      </main>
    </div>
  );
};

export default MaintenancePage;
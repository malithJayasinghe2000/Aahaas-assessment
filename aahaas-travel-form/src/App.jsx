// src/App.jsx

import { useState, useCallback } from 'react';
import { Preloader } from './components/common/Preloader';
import { PageLayout } from './components/layout/PageLayout';
import { TravelForm } from './components/travel/TravelForm';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Full-screen animated preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main application layout */}
      <PageLayout>
        <TravelForm />
      </PageLayout>
    </>
  );
}

export default App;
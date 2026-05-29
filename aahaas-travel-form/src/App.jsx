// src/App.jsx

import { useState, useCallback } from 'react';
import { Preloader } from './components/common/Preloader';
import { PageLayout } from './components/layout/PageLayout';
import { TravelForm } from './components/travel/TravelForm';

/**
 * Root application component.
 *
 * Manages the preloader lifecycle: shows the animated preloader on mount,
 * then transitions to the main form layout once loading completes.
 */
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
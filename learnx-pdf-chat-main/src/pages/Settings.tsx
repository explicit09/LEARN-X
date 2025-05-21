
import MainLayout from '@/components/Layout/MainLayout';
import PreferencesForm from '@/components/Settings/PreferencesForm';

const Settings = () => {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <PreferencesForm />
      </div>
    </MainLayout>
  );
};

export default Settings;

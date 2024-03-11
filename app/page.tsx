import Image from 'next/image';
import GoogleMapContainer from '@/app/components/Map/GoogleMap';
import HeaderToolBar from '@/app/components/HeaderToolBar';

export default function Home() {
  return (
    <div>
      <HeaderToolBar />
      <main>
        <GoogleMapContainer />
      </main>
    </div>
  );
}

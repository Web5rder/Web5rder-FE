import Cart from './components/Cart';
import PurchaseForm from './components/PurchaseForm';

export default function Home() {
  return (
    <div className="flex-grow bg-amber-100 p-4">
      <div className="bg-cyan-300 w-12 mb-4 text-center">구매</div>
      <PurchaseForm />
      <Cart />
    </div>
  );
}

import Recommend from '../recommend/Recommend';
import Reorder from '../Reorder';
import Welcome from '../Welcome';

function MainContainer() {
  return (
    <div className="flex flex-col gap-y-20 items-center">
      <Welcome />
      <Reorder />
      <Recommend />
    </div>
  );
}

export default MainContainer;

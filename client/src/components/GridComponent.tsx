import './styles.css'

interface props {
  children: any;
}


const GridComponent: React.FC<props> = (props) => {
//@ts-ignore
  const { children } = props;
    
    return (
    <div className="bar-chart grid-item">
        ...children
    </div>
    );
  };

  export default GridComponent;

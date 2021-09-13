import './NextPrev.css';

 const NextPrev = ({isNextEnable,isPrevDisable,Next,Prev}) =>(  
    <div>
        <button onClick={Next} >
            Next
          </button>
          <button onClick={Prev}>
            Previous
        </button>
    </div>

);

export default NextPrev;
import './App.css';
import { useState } from 'react';
import data from './data.js';
import Calendar from 'react-calendar';
import moment from "moment";


function App() {
  let [datas, setDatas] = useState(data);
  let [modal, setModal] = useState(false);
  let [index, setIndex] = useState(0);
  let [write, setWrite] = useState(false);
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div className="black-nav">
        <h3>Calendar</h3>
      </div>
      <div>
      <Calendar onChange={onChange} value={value} />
         <button className="일정등록버튼" onClick={()=>{
          setWrite(true)
         }}
         >일정 등록 
         </button>
     </div>
     {
        datas.map(function (row, i) {
          return (
            <div className="list">
              <div className="title" onClick={() => {
                modal ? setModal(false) : setModal(true);
                setIndex(i);
              }}>{row.title}</div>
              <div className="contents">{row.date}</div>
            </div>
          )
        })
      }


      {write? <Write setWrite={setWrite}
                    datas ={datas}
                    setDatas={setDatas}
                    value={value} 
        >{moment(value).format("YYYY년 MM월 DD일")} </Write>:''} 



      {modal ? <Modal modal={modal} 
        setModal={setModal}
        datas={datas}
        setDatas={setDatas}
        value={value} 
        index={index}
        
      ></Modal> : ''}

    </div>
  );
}


function Write(props){ 
  let [title, setTitle] = useState('');
  let [contents, setContents] = useState('');
  
  return( 
    <div className='modal'>
      <div className='modal-body'>
        <div className='modal-title'>일정 계획</div>
        <div className='write-content'>
          <span>시간대</span>
          <input type='text'
              onChange={(e)=>{
                setTitle(e.target.value)
              }}
              ></input>
          <span>할 일</span>
          <textarea onChange={(e)=>{
            setContents(e.target.value)
          }}></textarea>
        </div>
        <button className='modal-button'
              onClick={()=>{
                let data={ 
                  title : title, 
                  date: moment(props.value).format("YYYY년 MM월 DD일") ,
                  content: contents,
                  
                }
                let copy = [...props.datas];
                copy.unshift(data);
                props.setDatas(copy);
                props.setWrite(false);
                
              }}
        >확인</button>
      </div>
    </div>
  )
}


function Modal(props) { 
  let [modify, setModify] = useState(false);
  let [contents, setContents] = useState('');
  
  return (
    <div className="modal">
      <div className="modal-body">
        <div className="modal-title">{props.datas[props.index].title}</div>
        <div className="modal-date">{props.datas[props.index].date}</div>

        {modify ?
          <div className="modal-contents">
            <textarea className='modify-content' onChange={(e)=>{
              setContents(e.target.value) 
              
            }}
              value={contents} />
          </div> :
          <div className="modal-contents">{props.datas[props.index].content}</div>
        }


        <button className="modal-button" onClick={() => {
          props.modal ? props.setModal(false) : props.setModal(true);
        }}>확인</button>
        <button className='modal-button'
          onClick={() => { 
            setModify(!modify);
              if(modify){ 
                let copy = [...props.datas]; 
                copy[props.index].content = contents; 
                props.setDatas(copy) 
              }else{ 
                setContents(props.datas[props.index].content) 
              }
          
          }}>{modify ? '저장' : '수정'}</button> 



        <button className="modal-button" onClick={() => {
          let copy = [...props.datas];
          copy.splice(props.index, 1);
          props.setDatas(copy);
          props.modal ? props.setModal(false) : props.setModal(true);
        }}>삭제</button>
      </div>
    </div>
  )
}

export default App;
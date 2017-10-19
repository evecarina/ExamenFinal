class Model{
    constructor(){
        this.input=null;
        this.guests=[];
        this.guestcomments=[];
        this.render=null;
    }
    subscribe(render){
      this.render=render;
    }
    update(){
      this.render();
    }
    addName(){
      this.guests.push({name:this.input.value,id:Utils.uuid(),confirmed:''});
      this.input.value='';      
      this.update();
    }
      
    delete(id){
      for(let pos in this.guests)
        if(this.guests[pos].id == id){
          this.guests.splice(pos, 1);
          break;
        }
      this.update();
    }    
}
const Guests=({model})=>{
  return (<ul>
    {model.guests.map((g)=>{
      return <li key={g.id} className={g.confirmed}>{g.name}{g.comment}
      <br/><button onClick={()=>model.delete(g.id)}>Remove</button>     
      </li>  
    })
    }   
    </ul>);   
}

const View=({title,model})=>{
  return (
    <div className="wrapper">
      <header>
        <p> Nuevo Comentario </p>
        <form onSubmit={(e)=>{e.preventDefault();model.addName()}}>
          <input type="text" placeholder="User" onChange={e => (model.input = e.target)} />      
          <input type="text" placeholder="Comment" onChange={e => (model.input = e.target)} />
          <button type="submit">Post Comment</button>
        </form>         
      </header>
      <div className="main">	
        <h2>Comments</h2>
        <Guests model={model}/>
      </div>
    </div>
  );
}

let model = new Model();
let render = () => {
   ReactDOM.render(
      <View title="View" model={model} />,
      document.getElementById('container')
   );
};
model.subscribe(render);
render(); 
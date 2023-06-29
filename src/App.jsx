import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios'
import { Card,  Input } from 'semantic-ui-react'

function App() {
  const [apiData,setApiData] = useState([])
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');


  useEffect(()=>{
      axios.get('https://reqres.in/api/users?page=2')
      .then((response)=>{
        setApiData(response.data.data)
      })
  },[])
  
  const searchItems = (searchValue) => {
    
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = apiData.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(apiData)
    }
}
  return (
   
    <div className='container'>
      <Input placeholder='search...' icon='search' onChange={e=>searchItems(e.target.value)}/>
      <Card.Group itemsPerRow={3} stackable style={{marginTop:20}}>
        {searchInput.length > 1 ? 

          filteredResults.map((item) => (
            <div>
            
           <Card key={item.id} className='extra'   >
             
               
             <div>
               
               <span>{item.id}</span>
             </div>
               <img src={item.avatar} style={{height:'100%',width:'100%',borderRadius:'50px',objectFit:'cover',padding:10}} />
             
               
               
               
               <Card.Content>
                 <Card.Header textAlign='center'>{item.first_name}</Card.Header>
               </Card.Content>
               
           </Card>
           
          </div>
           
          ))
        
        : apiData.map((item)=>(
          
            
           <Card key={item.id}  >
             
               
             <div>
               
               <span>{item.id}</span>
             </div>
             
               
               
               <img src={item.avatar} style={{height:'100%',width:'100%',borderRadius:'50px',objectFit:'cover',padding:10}} />
               
               <Card.Content>
                 <Card.Header textAlign='center'>{item.first_name}</Card.Header>
               </Card.Content>
               
           </Card>
           
          
           
         ))
        }
      </Card.Group>
       
    </div>
    
  )
}

export default App

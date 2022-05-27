




class ComponentDbService {

  // const [dbComponents, setDbComponents] = useState([]);

  getAllComponents = () => {


    const requestOptions = {
      method: 'GET',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      //body:JSON.stringify(component) 
    };
    // console.log ('insert in db'+ cve.vulnId)
    const temp = fetch('http://localhost:4002/components/find');

    //temp.then((res) => res.json()).then(data=> console.log("db data "+data));

    //console.log("temp"+temp.json().then(data=>data));
    return temp;

  } // close of GetAllComponents 
  /*
    console.log(" Get all components " + dbComponents);
  
    components.map((component) => {
  
      const isExist = dbComponents?.filter((com) => com.componentName == component.componentName && com.version == component.version)
      if (!isExist) {
  
        saveComponent2Db(component);
      }
  */







  saveComponent2Db = (component) => {
   // console.log("calling save compoents " + component.componentName);

    const compData = {
      Id: component.sNo,
      componentName: component.componentName,
      version: component.version
    };
    console.log("saving component "+JSON.stringify(compData));

    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(compData)
    };
    // console.log ('insert in db'+ cve.vulnId)
    return fetch('http://localhost:4002/components/save', requestOptions);



  }; // close of save method 

} // close of class 

export default ComponentDbService;
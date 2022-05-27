var ip_str = "";
var db_array = [];
var data_read = false;
// var components = []
// Connect to mongo db 
// URI- mongodb://username:password@localhost:27017/?authSource=admin
const dburl = 'mongodb://localhost:27017';
const dbname = 'smart_search_db';
const collname = 'smart_search_col';

var conn;
var uri = "mongodb://localhost:27017";
const { equal } = require('assert');
const { time } = require('console');
const {MongoClient} = require('mongodb');
const {semver} = require('semver');
const client = new MongoClient(uri);


MongoClient.connect(dburl, function(err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection(collname);

      collection.find({}).toArray().then((ans) => {
        // for (let i = 0; i < ans.length; i++) {
        //     components[i] = ans[i]["_id"];
        // }
        db_array = ans;
        console.log("data received",db_array[0]["_id"]);
        data_read = true;
        // console.log(components);
        });

        // close db client
       // client.close();
    }
});


//future -  not used now
function check_similarity(str,std_str){
    var threshold = 0.85;
    var go_to_next = false;
    var return_arr = [];

    //for each string in the db
    for(let i=0; i<db_array.length;i++){
        go_to_next=false;
        //split the string on _ or - or +
        var split_str_arr = db_array[i].split(/[-_+]/);
        var best_fit = 0;
        //for each item in the split sting -> string array
            for(let j=0;j<split_str_arr.length;j++){
            //find the cosine distance to the input string [split the input string and then find best]
                if(split_str_arr[j].length>2){
                    var split_ip = str.split(/[-_+]/);
                    var temp = 0;
                    for(let k = 0; k<split_ip.length;k++){
                        if(split_ip[k].length>2) {
                            temp = cosine_dist_sw(split_str_arr[j].toLowerCase(),split_ip[k].toLowerCase());
                            if(temp>best_fit){
                                best_fit=temp;                             
                            }

                            if(temp==1){
                                go_to_next=true
                                break;
                            }
                        }
                    }
                }
            //store the best matched value,
            //if the best distance is greater than the threshold, append to the found array
            // if best is greater than the threshold
                if(best_fit>threshold){
                    // console.log(db_array[i],best_fit,threshold);
                    return_arr.push(db_array[i]);
                }
                //find the fuzzy score of the matched string and store max fuzzy score

                //if best fit is seen, go to next entry
                if(go_to_next){
                    break;
                }
            }
        
    } 
        //sort the array over the fuzzy score

        //return result array
        return return_arr;
}

//simple string compare
function str_similarity(str1,str2){
    var best = 0;
    var dist = 0;
    var diff = 0;
    var min = 0;
   
    let sub_str1=""
    let sub_str2=""
    //find the smaller string
    if(str1.length<str2.length){
        sub_str1 = str1;
        sub_str2 = str2;
    }
    else{
        sub_str1 = str2;
        sub_str2 = str1;
    }
    min = sub_str1.length;
    diff = (sub_str2.length - sub_str1.length);


    if(diff==0){
        if(str1 == str2){
            best = 1;
        }
    }
    else{
        //from first element till the end of string - length of smaller string
        for(let i=0;i<=diff;i++){
           let sub_str2_w="";
            sub_str2_w = sub_str2.substring(i,i+min);
            if(sub_str1 == sub_str2_w){
                 best = 1;
                break;
            }
        }
    }
    //return the distance
    return best;
}

//finding the similarity between 2 strings
function cosine_dist_sw(str1,str2){
    var best = 0;
    var dist = 0;
    var diff = 0;
    var min = 0;
    //find the smaller string
    if(str1.length<str2.length){
        sub_str1 = str1;
        sub_str2 = str2;
    }
    else{
        sub_str1 = str2;
        sub_str2 = str1;
    }
    min = sub_str1.length;
    diff = (sub_str2.length - sub_str1.length);


    if(diff==0){
        best = cosine_dist(str1,str2);
    }
    else{
        //from first element till the end of string - length of smaller string
        for(let i=0;i<=diff;i++){
            sub_str2_w="";
            sub_str2_w = sub_str2.substring(i,i+min);
            //find the cosine distance
            //if cosine distance = 1, return 1, else store the max cosine dist
            dist = cosine_dist(sub_str1,sub_str2_w);
            if(dist > 0.99){
                best = 1.0;
                break;
            }
            else{
                if(dist>best){
                    best=dist;
                }
            }
        }
    }
    //return the distance
    return best;
}
function cosine_dist(str1,str2){
    //the string are expeted in lowercase
    //both strings must be of same length
    //define the arrays
    var vector1 = [];
    var vector2 = [];
    var min=0;
    for(let i=0;i<255;i++){
        vector1.push(0);
        vector2.push(0);
    }
    //safeguard___________________
    if(str1.length<str2.length){
        min = str1.length;
    }
    else{
        min = str2.length;
    }
    //_________________________
    for(let i=0;i<min;i++){
        vector1[str1.charCodeAt(i)] = vector1[str1.charCodeAt(i)]+1;
        vector2[str2.charCodeAt(i)] = vector2[str2.charCodeAt(i)]+1;
    }
    return dotProduct(vector1,vector2)/ (magnitude(vector1) * magnitude(vector2));
}

function dotProduct(vecA, vecB){
    let product = 0;
    for(let i=0;i<vecA.length;i++){
        product += vecA[i] * vecB[i];
    }
    return product;
}

function magnitude(vec){
    let sum = 0;
    for (let i = 0;i<vec.length;i++){
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}
 
function version_cmp(v1,v2){
    retval = 0;  //return IDBCursorWithValue, 0- if equal, -1 if v1<v2 and 1 if v1>v2
    //the version are in the for xxx.xxx.xxx [ where x is aphanumeric wit '-' also present sometimes]

    // console.log("checking : ",v1,v2);
    v1_arr = v1.split('.');
    v2_arr = v2.split('.');
    len = 0
    if(v1.length>v2_arr.length){
        len = v2_arr.length;
    }
    else{
        len = v1_arr.length;
    }
    for(let i=0;i<len;i++){
        if(i==0){
            const re2 = new RegExp('^\\D*');
            s1 = re2.exec(v1_arr[i]);
            s2 = re2.exec(v2_arr[i]);
            var cmp1 = v1_arr[i].substring(s1[0].length,v1_arr[i].length);
            var cmp2 = v2_arr[i].substring(s2[0].length,v2_arr[i].length);
            if(parseInt(cmp1)>parseInt(cmp2)){
                retval = 1;
                break;
            }
            
            if(parseInt(cmp1)<parseInt(cmp2)){
                retval = -1;
                break;
            }
        }

        //comparing with assumption that we will have integers only - [future]        
        const myRe = new RegExp('([0-9]+)'); //filter to remove non numeric values
        const v1_re = myRe.exec(v1_arr[i]);
        const v2_re = myRe.exec(v2_arr[i]);

        if(parseInt(v1_re[0])>parseInt(v2_re[0])){
            retval = 1;
            break;
        }
        
        if(parseInt(v1_re[0])<parseInt(v2_re[0])){
            retval = -1;
            break;
        }
    }
    if(retval==0){
        if(v1_arr.length>v2_arr.length){
            retval = 1;
        }else{
            if(v1_arr.length<v2_arr.length){
                retval = -1;
            }
        }
    }

    //the version is also of the form xxxx-xx-xx when providing dates [future]
    return retval;
}


function get_reccomenations(db_ver){
    var retval = "Use version - ";
    
    for(let i = 0; i<db_ver.length;i++){
        //console.log("db version i : ",db_ver);
        if(db_ver[i]["equal_ver"]!="?"){
            retval = retval + " [not equal to "+db_ver[i]["equal_ver"]+"]";
        }
        else{
            var st = db_ver[i]["start_ver"];
            var en = db_ver[i]["end_ver"];
            if(st!="?"){
                retval =  retval + "[ < "+st;
            }
            if(en!="?"){
                retval =  retval + " or >= "+en+ " ]"  ;      
            }
            else{
                if(st!="?"){
                    retval =retval + " ]";
                }
            }
        }
    }
    return retval;
}



function version_check(db_versions,vulnerable,version){

    var retval = false;
    var c_check = true;
    var found = false;
    // console.log("v ->",version);
    for(let j=0;j<db_versions.length;j++)
    {

        if(found){break;}
        element = db_versions[j];
        
        var start = element["start_ver"];
        var end = element["end_ver"];
        var equal = element["equal_ver"];
        var prev_end;
        var st_array = [];
        var en_array = []
        

        ////Currently equal case in not implemented
        // if(equal != "?"){
        //     var tmp = version_cmp(verion,equal);
        //     if(tmp == 0){
        //         retval = true;
        //         break
        //     }
        // }

        //since this section will be visited only if not apply to all, it is not required to be checked
        if(start=="?"){
            start = "0.0.0";
        }
        if((end == "?")||(end == "*")||(end == "-")){  //both will not be "?" since that is handled in apply to all case
                //end_chk = -1;  //since the ve was introduced after a version
                end="0.0.0";
        }else{
            end_chk = version_cmp(version,end);
        }

        start_chk = version_cmp(version,start);


        if(end_chk==-1){
            if((start_chk == 1)||(start_chk==0)){
                found = true;
                retval = true;
                // console.log("caught");
                // console.log("st ",start,"en ",end,"ver ",version);
            }
        }

    
    }
    return retval;
}

function check_vulnerability_main(ip_array,db_array){
    //for each componet in sbom
    var dist = 0;
    var cve_list = [];
    var threshold_dist = 0.95;
    var versions = {};
    ip_array.forEach(ip_element => {
        
        dist = 0;
        var temp_cve_list = [];
        //check the component for a match in the db array with _id
        db_array.forEach(db_element => {
            //check for a match in the component name
            var include =  false;
                if((ip_element["component"].length>3) && (db_element["_id"].length>3)){
                //dist = str_similarity(ip_element["component"],db_element["_id"]);  //cosine_dist_sw by passed every time since input is expected in clean form
                if(dist>threshold_dist){
                    include = true;
                }
                else{
                    if(ip_element["component"]==db_element["_id"]){
                        include = true;
                    }
                }
            }
            
            //If the component name matches
            if(include){
                var element = ip_element;
                var flag=true;
                //if the vulnerability is already included, skip further checking of the version for vulneratbility in this iterationb
                if(cve_list.length>0){
                    for(let i=0;i<cve_list.length;i++){
                        if((ip_element["component"]==cve_list[i]["component"])&&(ip_element["version"]==cve_list[i]["version"])){
                            flag=false;
                            break;
                        }
                    }
                }
                if(flag){
                    //console.log("found : ",element["component"],db_element["versions"]);
                    var retval = false;
                    var recco = "";
                    //if applicable to all versions, include in the list of ve's
                    if(db_element["versions"][0]["apply_all"]){                        
                        retval = true;
                        recco = "Suggested to remove this component";
                    }
                    else{
                        //else if check for version
                        retval = version_check(db_element["versions"],true,ip_element["version"]);
                    }

                    //if version falling in the range of ve's
                    if(retval) {
                        // console.log(db_element["versions"],ip_element["version"]);
                        element["impact"] = db_element["impact"];
                        element["description"]=db_element["description"];

                        //get the recommendation by picking the appropriate version that is not vulnerable

                            //in case apply to all, add "remove this component" as recommendation
                            if (!db_element["versions"][0]["apply_all"]){
                                //else, get the set of versions that can be used considering the in between ones as well
                                recco = get_reccomenations(db_element["versions"],ip_element["version"]);
                            }

                        element["recommendation"] = recco;
                        cve_list.push(element);
                    }
                }

            }
        });
    });
    return cve_list;
}

function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
 }  

// console.log("test results : ",check_similarity("nodules"));
//connect_db_and_check(ip_array);
async function init() {
    while(!data_read)
    {
        console.log("Waiting");
        await sleep(1000);
    }
    console.log("read from db");
   // console.log(check_vulnerability_main(ip_array,db_array));
   // console.log("scan complete");
}

init();

//[{'component': 'apache_tomcat', 'version': '2.0.34'}]

export default check_vulnerability_main;


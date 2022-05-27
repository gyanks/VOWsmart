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
var uri = "mongodb://localhost:27017"

const { time } = require('console');
const {MongoClient} = require('mongodb');
const {semver} = require('semver');
const client = new MongoClient(uri);

///----------------------------------------------------

ip_array = [{'component': 'apache_tomcat', 'version': '2.0.34'}, {'component': 'applicationinsights-core-native', 'version': '64'}, {'component': 'applicationinsights-core-native', 'version': '32'}, {'component': 'authentication_library', 'version': '1.6.2'}, {'component': 'azure_sdk_for_java', 'version': '1.11.1'}, {'component': 'azure_sdk_for_java', 'version': '2.3.5'}, {'component': 'azure_sdk_for_java', 'version': '1.10.0'}, {'component': 'azure_sdk_for_java', 'version': '2.2.0'}, {'component': 'azure_sdk_for_java', 'version': '2.5.0'}, {'component': 'azure_sdk_for_java', 'version': '1.1.2'}, {'component': 'azure_sdk_for_java', 'version': '1.0.0'}, {'component': 'azure_sdk_for_java', 'version': '1.27.1'}, {'component': 'azure_sdk_for_java', 'version': '1.8.0'}, {'component': 'azure_sdk_for_java', 'version': '2.6.0'}, {'component': 'azure_sdk_for_java', 'version': '1.7.1'}, {'component': 'azure_sdk_for_java', 'version': '1.21.0'}, {'component': 'azure_sdk_for_java', 'version': '4.2.8'}, {'component': 'azure_sdk_for_java', 'version': '5.8.0'}, {'component': 'azure_sdk_for_java', 'version': '0.11.1'}, {'component': 'azure_sdk_for_java', 'version': '1.3.0'}, {'component': 'bit', 'version': '1.2'}, {'component': 'cache', 'version': '1.1.1'}, {'component': 'commons_beanutils', 'version': '1.9.4'}, {'component': 'commons_collections', 'version': '3.2.2'}, {'component': 'commons_collections', 'version': '4.4'}, {'component': 'commons_compress', 'version': '1.21'}, {'component': 'commons_configuration', 'version': '1.8'}, {'component': 'commons_fileupload', 'version': '1.4'}, {'component': 'commons_io', 'version': '2.11.0'}, {'component': 'dom4j', 'version': '2.1.3'}, {'component': 'generator', 'version': '4.0.1'}, {'component': 'generator', 'version': '2.7.7'}, {'component': 'guava', 'version': '30.0'}, {'component': 'guava', 'version': '9999.0'}, {'component': 'guava', 'version': '1.0.1'}, {'component': 'hibernate_orm', 'version': '5.4.21'}, {'component': 'httpasyncclient', 'version': '4.1.4'}, {'component': 'httpclient', 'version': '4.5.13'}, {'component': 'jackson-databind', 'version': '2.11.2'}, {'component': 'jackson-dataformat-xml', 'version': '2.11.2'}, {'component': 'jackson-modules-java8', 'version': '2.11.2'}, {'component': 'jakarta_expression_language', 'version': '3.0.3'}, {'component': 'java_se', 'version': '2.3.1'}, {'component': 'java_se', 'version': '1.2.2'}, {'component': 'java_se', 'version': '2.3.3'}, {'component': 'java_se', 'version': '0.3.0'}, {'component': 'java_se', 'version': '3.0.11'}, {'component': 'jersey', 'version': '1.19.1'}, {'component': 'jodd', 'version': '5.1.6'}, {'component': 'keycloak', 'version': '13.0.1'}, {'component': 'kubernetes', 'version': '1.21.2'}, {'component': 'legion-of-the-bouncy-castle-java-crytography-api', 'version': '1.69'}, {'component': 'log4j', 'version': '2.17.1'}, {'component': 'logback', 'version': '1.2.3'}, {'component': 'model', 'version': '4.10.3'}, {'component': 'nanohttpd', 'version': '2.3.1'}, {'component': 'netty', 'version': '4.1.73'}, {'component': 'nimbus_jose\\\\+jwt', 'version': '8.19'}, {'component': 'okhttp3', 'version': '3.14.9'}, {'component': 'openid_connect', 'version': '7.1.1'}, {'component': 'paho_java_client', 'version': '1.2.2'}, {'component': 'poi', 'version': '5.1.0'}, {'component': 'qpid', 'version': '0.53.0'}, {'component': 'qpid_proton-j', 'version': '0.30.0'}, {'component': 'redis', 'version': '2.6.0'}, {'component': 'redis', 'version': '2.3.4.release'}, {'component': 'redis', 'version': '3.15.6'}, {'component': 'retrofit', 'version': '2.6.4'}, {'component': 'service_bus', 'version': '2.3.5'}, {'component': 'service_bus', 'version': '2.6.0'}, {'component': 'simplexml', 'version': '2.7.1'}, {'component': 'snakeyaml', 'version': '1.26'}, {'component': 'spring_boot', 'version': '2.3.4.release'}, {'component': 'spring_framework', 'version': '5.2.9'}, {'component': 'spring_security', 'version': '5.3.4.release'}, {'component': 'storage', 'version': '12.12.0'}, {'component': 'storage', 'version': '12.14.0'}, {'component': 'storage', 'version': '12.0.5'}, {'component': 'storage', 'version': '12.11.1'}, {'component': 'storage', 'version': '2.6.0'}, {'component': 'storage', 'version': '8.6.0'}, {'component': 'swagger', 'version': 'ui-bundle.js'}, {'component': 'swagger', 'version': 'swagger-ui.js'}, {'component': 'swagger-ui', 'version': 'standalone-preset.js'}, {'component': 'time', 'version': '2.9.9'}, {'component': 'tomcat', 'version': '9.0.48'}, {'component': 'travis_ci', 'version': '2.3.0'}, {'component': 'travis_ci', 'version': '0.7.6'}, {'component': 'travis_ci', 'version': '0.10.1'}, {'component': 'xmlbeans', 'version': '5.0.2'}];

 // connect to DB
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


function get_details(component_id){
    var retval={};
    for(let i=0;i<db_array.length;i++){
        if(db_array["_id"]==component_id)
        retval = db_array[i];
        break;
    }
    return retval;
}

function string_similarity(str,std_str){
    var retval = cosine_dist_sw(str,std_str);
    return retval;
}

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
 
function version_check(db_versions,vulnerable,version){
    var retval = false;
    var found = false;
    for(i=0;i<db_versions.length;i++)
    {
        if(found){break;}
        element = db_versions[i];
        
        var start = element["start_ver"];
        var end = element["end_ver"];
       
        if((end=='*') || (end=='-')){
            retval = true;
            break;
        }
        else{
        //Simple version check impl
        //console.log(start,end,version);
            var start_arr = start.split(".");
            var end_arr = end.split(".");
            var version_arr = version.split(".");
            var count_std = 0;
            var count_ver = 0;

            if(version_arr.length==1){
                if(version_arr[0]>start_arr[start_arr.length-1] && version_arr[0]<=end_arr[start_arr.length-1] ){
                    retval = true;
                    found = true;
                }
            }
            else{
                var st_len = start_arr.length;
                var en_len = end_arr.length;
                var ver_len = version_arr.length;

                var min_len = ver_len;
                if(st_len<en_len && st_len<min_len){min_len=st_len;}else{if(en_len<ver_len){min_len=en_len;}}

                for(i=0;i<min_len;i++){
                    var a = parseInt(version_arr[i]);
                    var b = parseInt(start_arr[i]);
                    var c = parseInt(end_arr[i]);
                    if((a<b)||(a>c)){retval = true; found=true;}
                }
            }
        }
    } 
    // else{
    //     //todo check if vulnerable is required to be applied
    //     if(vulnerable){
    //         // start = semver.clean(start);
    //         // end = semver.clean(end);
    //         // version = semver.clean(version);

    //         console.log(start,end,version);
    //         // var start_arr = start.split(".");
    //         // var end_arr = end.split(".");
    //         // var version_arr = version.split(".");
    //         // var count_std = 0;
    //         // var count_ver = 0;

    //         // semver.gte('3.4.8', '3.4.7') //true
    //         // semver.lt('1.2.3', '9.8.7') // true
    //         //todo - check if the version is non alphanumeric i.e '*' or '-'
    //         if(semver.gt(version,end)){
    //             retval = false;
    //             console.log("gte");
    //         }
    //         else{
    //             if(semver.lt(version,start)){
    //                 retval = false;
    //                 console.log("lte");
    //             }
    //         }
    //     }
    // }
    return retval;
}

function check_vulnerability_main(ip_array,db_array){
    //for each componet in sbom
    var dist = 0;
    var cve_list = [];
    var threshold_dist = 0.95;
    var versions = {};
    ip_array.forEach(ip_element => {
        //console.log(ip_element);
        dist = 0;
        var temp_cve_list = [];
        //check the component for a match in the db array with _id
        db_array.forEach(db_element => {
                if(db_element["_id"].length>2){
                dist = cosine_dist_sw(ip_element["component"],db_element["_id"]);
                if(dist>threshold_dist){
                    cve_list.push(ip_element);
                    console.log("db",db_element["_id"],"ip",ip_element);
                    //console.log(db_element["versions"]);
                    // if(version_check(db_element["versions"],true,ip_element["version"])) {
                    //     cve_list.push(ip_element);
                    //      console.log("db",db_element["_id"],"ip",ip_element);
                    // }
                }
                else{
                    if(ip_element["component"]==db_element["_id"]){
                        if(version_check(db_element["versions"],true,ip_element["version"])) {
                            cve_list.push(ip_element);
                            console.log("db",db_element["_id"],"ip",ip_element);
                        }
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
    console.log(check_vulnerability_main(ip_array,db_array));
    console.log("scan complete");
}
init();


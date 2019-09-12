$(document).ready(function () {
    getDepartmentByUser();   
});

var wide = "<div class='tableauPlaceholder' style='width: 1895px; height: 877px;'><object class='tableauViz' width='1895' height='877' style='display:none;'><param name='host_url' value='https%3A%2F%2Ftableaubi.iadb.org%2F' /><param name='embed_code_version' value='3' /><param name='site_root' value='' /><param name='name' value='KPI&#47;Home' /><param name='tabs' value='no' /><param name='showShareOptions' value='false' /><param name='subscriptions' value='no' />			<param name='filter' value='iframeSizedToWindow=true&Department=$department&Measure=2' /><param name='customViews' value='no' /></object></div>";
var tablet = "<div class='tableauPlaceholder'><object class='tableauViz' width='100%' height='$heightpx' style='display:none;'><param name='host_url' value='https%3A%2F%2Ftableaubi.iadb.org%2F' /> <param name='embed_code_version' value='3' /><param name='site_root' value='' /><param name='name' value='KPI&#47;Home' /><param name='tabs' value='no' /><param name='showShareOptions' value='false' /><param name='subscriptions' value='no' />			<param name='filter' value='iframeSizedToWindow=true&Department=$department&Measure=2' /><param name='device' value='tablet' /><param name='customViews' value='no' /></object></div>	";
var mobile = "<div class='tableauPlaceholder'><object class='tableauViz' width='100%' height='$heightpx' style='display:none;'><param name='host_url' value='https%3A%2F%2Ftableaubi.iadb.org%2F' /> <param name='embed_code_version' value='3' /><param name='site_root' value='' /><param name='name' value='KPI-mobile&#47;Home' /><param name='tabs' value='no' /><param name='showShareOptions' value='false' /><param name='subscriptions' value='no' />			<param name='filter' value='iframeSizedToWindow=true&Department=$department&Measure=2' /><param name='device' value='phone' /><param name='customViews' value='no' />			</object></div>	";

function getDepartmentByUser() {
    $.ajax({
        async: true, // Async by default is set to “true” load the script asynchronously
        // url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|rcalloni@iadb.org'", // URL to fetch data from sharepoint list
        // url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|VICENTEF@iadb.org'", // URL to fetch data from sharepoint list
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties", // URL to fetch data from sharepoint list
        method: "GET", //Specifies the operation to fetch the list item
        headers: {
            accept: "application/json;odata=verbose", //It defines the Data format
            "content-type": "application/json;odata=verbose" //It defines the content type as JSON
        },
        success: function (data) {
            var data = data.d;
            var title = data.Title;
            var deparmentTosend;
            var departmentDivision = filterPropiety(
                data.UserProfileProperties.results,
                "Department"
            );
            var department = departmentDivision[0].Value.split("/")[0];
            var division = departmentDivision[0].Value.split("/")[1];
            console.log("Title", title);
            console.log("Department", department);
            console.log("Division", division);
            if (validatePresidentOrKic(title, department)) {
                deparmentTosend = ("IDB Group");
            } else if (validateManager(title)) {
                if (department == "MIF") {
                    department = "IDB Lab";
                }
                deparmentTosend = (department);

            } else {
                deparmentTosend = division;
            }
            var html = wide;
            console.log(window.screen.width,"width with window")
            console.log(screen.width,"width without window")
            if (screen.width <= 1500 && screen.width>450) {
                html = tablet;
            } else if(screen.width <=450) {
                html = mobile;
            }
            
            console.log("value to send", department);
            // document.getElementById('load-tableau').innerHTML = "<div class='tableauPlaceholder' style='width: 1895px; height: 877px;'><object class='tableauViz' width='1895' height='877' style='display:none;'><param name='host_url' value='https%3A%2F%2Ftableaubi.iadb.org%2F'/><param name='embed_code_version' value='3' /><param name='site_root' value='' /><param name='name' value='KPI&#47;Home' /><param name='tabs' value='no' /><param name='showShareOptions' value='false' /><param name='subscriptions' value='no' />  <param name='filter' value='iframeSizedToWindow=true&Department=" + deparmentTosend + "&Measure=2' /><param name='device' value='desktop' /><param name='customViews' value='no' />  </object></div>";
            html= html.replace("$department", department);
            document.getElementById('load-tableau').innerHTML = html.replace("$height", screen.height);
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}

function filterPropiety(array, propiety) {
    return array.filter(function (data) {
        return data.Key == propiety;
    });
}

function validatePresidentOrKic(title, department) {
    console.log(
        "President or KIC",
        department.toUpperCase() === "KIC" ||
        title.toUpperCase().includes("PRESIDENT")
    );

    return (
        department.toUpperCase() === "KIC" ||
        title.toUpperCase().includes("PRESIDENT")
    );
}

function validateManager(title) {
    console.log(
        "Manager",
        title.toUpperCase().includes("MANAGER") ||
        title.toUpperCase().includes("MGR")
    );
    return (
        title.toUpperCase().includes("MANAGER") ||
        title.toUpperCase().includes("MGR")
    );
}
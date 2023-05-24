const table = document.getElementById("profo-info-table");
const tbody = document.createElement("tbody");

const keys = ["title", "part", "level", "finished_count", "acceptance_rate", "solved"];
const attributes = ["제목", "분류", "난이도", "정답자수", "정답률", "풀이여부"];
(async () => {let queryOptions = {
        active: true,
        currentWindow: true
    };
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab);
    let no = tab.url.split("/").reverse()[0];
    console.log(no);
    let path = chrome.runtime.getURL('./data/programmers.json');
    fetch(path)
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
        console.log(json[no.toString()]);
        let data = {};
        data["title"] = json[no]["title"];
        data["part"] = json[no]["part"];
        data["level"] = json[no]["level"];
        data["finished_count"] = json[no]["finished_count"];
        data["acceptance_rate"] = json[no]["acceptance_rate"];
        data["solved"] = json[no]["solved"];
        return data;
    })
    .then((data) => {
        for (let i=0; i<6; i++) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            td1.style = "background-color: #eee;"
            td1.appendChild(document.createTextNode(attributes[i]));
            const td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(data[keys[i]]));
            tr.appendChild(td1);
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
    })
})();
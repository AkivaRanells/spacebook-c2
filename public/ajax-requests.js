
class AjaxRequests{
    constructor(url, method, data){
        this.url = url;
        this.method = method;
        this.data = data;
    }

    getAjax(){
        return $.ajax({
            method: this.method,
            url: this.url,
        })
    };

    postAjax(){
        return $.ajax({
            method: this.method,
            url: this.url,
            data: this.data,
            dataType: "json"
        })
    };

    deleteAjax(){
        return $.ajax({
            method: this.method,
            url: this.url,
        })
    };
}

export default AjaxRequests
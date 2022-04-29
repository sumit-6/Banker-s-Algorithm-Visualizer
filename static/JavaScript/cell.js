class cell{
    constructor(position, width, height, process, id){
        this.position = position;
        this.width = width;
        this.height = height;
        this.process = process;
        this.id = id;
    }
    plot(){
        stroke(255);
        strokeWeight(1.5);
        let x = this.position.x;
        let y = this.position.y;
        noFill();
        rect(x - this.width/2, y - this.height/2, this.width,this.height);
        if(this.process === false) {}
        else {
            let string = `P${this.id}: `;
            for(let i = 0; i < this.process.length; i++)
            {
                if(i == this.process.length-1)
                {
                    string += " " + this.process[i];
                }
                else string = string + " " + this.process[i] + " ,";
            }
            textSize(this.height/1.8);
            text(string, x - this.width/2.2, y + this.height/4);
        }
    }
}
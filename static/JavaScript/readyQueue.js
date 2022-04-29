class readyQueue{
    constructor(numberOfProcesses, QueueDistance, gap, cellWidth, cellHeight){
        this.numberOfProcesses = numberOfProcesses;
        this.QueueDistance = QueueDistance;
        this.gap = gap;
        this.cellHeight = cellHeight;
        this.cellWidth = cellWidth;
        this.n = numberOfProcesses;
    }
    get(){
        for(let i = this.numberOfProcesses-1; i >= 0; i--)
        {
            cells[i] = new cell(createVector(this.QueueDistance + this.gap + this.cellWidth/2, 700 - this.QueueDistance - this.gap - ((this.cellHeight*(2*(this.numberOfProcesses-1-i) + 1))/2 + (this.numberOfProcesses-1-i)*this.gap)), this.cellWidth, this.cellHeight, remainingNeed[i], i);
            queue1[i] = cells[i];
        }
        let queueHeight = this.numberOfProcesses * this.cellHeight + (this.numberOfProcesses + 1)*this.gap;
        let queueWidth = this.cellWidth + 2*this.gap;
        this.queue = new cell(createVector(this.QueueDistance + queueWidth/2, 700 - this.QueueDistance - queueHeight/2), queueWidth, queueHeight, false);
    }
    plot(){
        for(let i = this.n-1; i>=0; i--)
        {
            if(queue1[i] !== undefined)
            queue1[i].plot();
        }
        
        this.queue.plot();
    }
}
class processedQueue{
    constructor(numberOfProcesses, QueueDistance, gap, cellWidth, cellHeight){
        this.numberOfProcesses = numberOfProcesses;
        this.QueueDistance = QueueDistance;
        this.gap = gap;
        this.cellHeight = cellHeight;
        this.cellWidth = cellWidth;
        this.n = 0;
    }
    get(){
        let queueHeight = this.numberOfProcesses * this.cellHeight + (this.numberOfProcesses + 1)*this.gap;
        let queueWidth = this.cellWidth + 2*this.gap;
        this.queue = new cell(createVector(1520 - (this.QueueDistance + queueWidth/2), 700 - this.QueueDistance - queueHeight/2), queueWidth, queueHeight, false);
    }
    plot(){
        for(let i = this.numberOfProcesses-1; i>=0; i--)
        {
            if(queue2[i] !== undefined)
            {
                queue2[i].position = createVector(1520 - (this.QueueDistance + this.gap + this.cellWidth/2), 700 - this.QueueDistance - this.gap - ((this.cellHeight*(2*(this.numberOfProcesses-1-i) + 1))/2 + (this.numberOfProcesses-1-i)*this.gap));
                queue2[i].plot();
            }
        }
        
        this.queue.plot();
    }
}
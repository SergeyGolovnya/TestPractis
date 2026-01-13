const Task = {
    setId: function(id) {this.id = id},
    outputId: function() {console.log(this.id)},
};

const XYZ = Object.create(Task);

XYZ.prepareTask = function(id, label) {
    this.setId(id);
    this.label = label;
};

XYZ.outputTask = function() {
    this.outputId();
    console.log(this.label);
};

const ABC = Object.create(XYZ);

ABC.prepareTask(1, 'Task1');
ABC.outputTask();

console.log(ABC);
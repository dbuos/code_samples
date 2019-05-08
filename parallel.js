/**
 * LLH Interview Question:
 * Implement a function that takes the following array,
 * sorts it into descending order by the 'order' property,
 * and then executes each 'action'.
 * Every action must complete before the next action can be run.
 *
 * Order is non-unique, and every action with the same order can be run
 in parallel.
 * All actions with the same order must complete before actions with the
 next order can run.
 */
var action = function(obj) {
    console.log("Started at: " + new Date());
    setTimeout(function(){
        console.log("Finished at: " + new Date());
        obj.done();
    }, Math.floor(Math.random() * 1000) + 1);
};
var array = [
    {
        order: 5,
        action: action
    },
    {
        order: 4,
        action: action
    },
    {
        order: 1,
        action: action
    },
    {
        order: 2,
        action: action
    },
    {
        order: 2,
        action: action
    },
    {
        order: 0,
        action: action
    },
    {
        order: 3,
        action: action
    },
    {
        order: 5,
        action: action
    }
];
// Code goes here:

function run() {
    let newArray = [];
    array.forEach((item) => {
        if (!newArray[item.order]) {
            newArray[item.order] = {order: item.order, items: []};
        }
        newArray[item.order].items.push(item);
    });

    newArray.sort((a, b) => b.order - a.order);
    let waitSize = 0;

    function exec(next) {
        next < newArray.length && parallel(newArray[next].items, next+1);
    }

    function parallel(items, next) {
        waitSize = items.length;
        items.forEach((item) => item.action({done: () => --waitSize === 0 && exec(next)}))
    }

    exec(0);
}

run();

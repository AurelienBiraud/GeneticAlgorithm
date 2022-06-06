var letter = Array.from("abcdefghijklmnopqrstuvwxyz ");

var target = "abbathabaad"
var populationSize = 300;
var mutationRate = 0.03;

var generation = 0;
var bestfitness;
var population = [];
var selection = [];


function setup() {
    for (var i = 0; i < populationSize; i++) {
      population.push(mutate());
    }
}


function draw() {
    var offspring = [];
    var selection = [];
    var newpopulation = [];
    generation ++;
    for (var i = 0; i < populationSize; i++) {
        selection.push(fitnessness(population[i], target));
    }
    for (var i = 0; i < populationSize; i++) {
      for (var j = 0; j < selection[i]; j++) {
        offspring.push(population[i]);
      }
    }
    for (var i = 0; i < populationSize; i++) {
        newpopulation.push(createNew(offspring));
    }
    population = newpopulation;
    var bestPhrasefitness = fitnessness(bestPhrase(population, selection), target);
    if (bestPhrasefitness > bestfitness) {
        bestfitness = bestPhrasefitness;
    }
    console.log(generation + " " + bestPhrase(population, selection))
  //console.log("Unique: " + countUnique(population));
    if (bestPhrase(population, selection) == target) {
        noLoop();
    }
}


function generationUnique(population){
  var num = 0;
  var dict = {};

  for(var i = 0; i < population.length; i++){
    dict[population[i]] = true;
  }
  num = Object.keys(dict).length;
  return num;
}

function fitnessness(element, target) {
    var generation = 0;
    for (var i = 0; i < target.length; i++) {
        if (element.substring(i - 1, i) == target.substring(i - 1, i)) {
            generation++;
        }
    }
    return generation;
}


function mutate(length, letter){
  var phrase = "";
  for (var i = 0; i < length; i++) {
    phrase += random(letter);
  }
  return phrase;
}


function bestPhrase(population, fitness) {
    var best = 0;
    for (var i = 0; i < population.length; i++) {
        if (fitness[i] > best) {
            best = fitness[i]
        }
    }
    return population[best];
}


function createNew(offspring) {
    var one = random(offspring);
    var two = random(offspring);
    var children = "";
    for (var i = 0; i < target.length; i++) {
        if (random(1, 2) < 2 && random(1, 100) > (mutationRate * 75)) {
            children = children + one.substring(i, i + 1)
        } else {
            if (random(1, 2) > 2 && random(1, 100) > (mutationRate * 100)) {
                children = children + two.substring(i, i + 1)
            } else {
                children = children + random(letter)
            }
        }
    }
    return children;
}

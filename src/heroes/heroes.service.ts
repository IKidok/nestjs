import { Injectable, NotFoundException } from '@nestjs/common';
import { Hero } from './model/heroes.model';

@Injectable()
export class HeroesService {
    heroes: Hero[] = [];

    insertHero(name: string, age: number, rating: number): string {
        const heroId = Math.random().toString();
        const newHero = new Hero(heroId, name, age, rating);
        this.heroes.push(newHero);
        return heroId;
    }

    getHeroes() {
        return [...this.heroes];
    }

    getHero(heroId) {
        return {...this.findHero(heroId)[0]};
    }

    updateHero(heroId: string, name: string, age: number, rating: number) {
        const [hero, index] = this.findHero(heroId);
        const updatedHero = {...hero};
        if (name) {
            updatedHero.name = name;
        }
        if (age) {
            updatedHero.age = age;
        }
        if (rating) {
            updatedHero.rating = rating;
        }
        this.heroes[index] = updatedHero;
    }

    deleteHero(heroId: string) {
        const heroIndex = this.findHero(heroId)[1];
        this.heroes.splice(heroIndex, 1);
    }

    private findHero(id: string): [Hero, number] {
        const heroIndex = this.heroes.findIndex(currentHero => currentHero.id === id);
        const hero = this.heroes[heroIndex];
        if (!hero) {
            throw new NotFoundException('Could not find hero');
        }
        return [hero, heroIndex];
    }
}

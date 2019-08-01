import { Injectable, NotFoundException } from '@nestjs/common';
import { Hero } from './model/heroes.model';
import {InjectModel} from '@nestjs/mongoose';
import { Model} from 'mongoose';
import runAllTicks = jest.runAllTicks;

@Injectable()
export class HeroesService {
    private heroes: Hero[] = [];

    constructor(@InjectModel('Hero') private readonly heroModel: Model<Hero>) {}

    async insertHero(name: string, age: number, rating: number) {
        const newHero = new this.heroModel({name, age, rating});
        const result = await newHero.save();
        return result.id as string;
    }

    async getHeroes() {
        const heroes = await this.heroModel.find().exec();
        return heroes.map(hero => ({ id: hero.id, name: hero.name, age: hero.age, rating: hero.rating}));
    }

     async getHero(heroId: string) {
        const hero = await this.findHero(heroId);
        return {
             id: hero.id,
             name: hero.name,
             age: hero.age,
             rating: hero.rating,
        };
    }

    async updateHero(heroId: string, name: string, age: number, rating: number) {
        const updatedHero = await this.findHero(heroId);
        if (name) {
            updatedHero.name = name;
        }
        if (age) {
            updatedHero.age = age;
        }
        if (rating) {
            updatedHero.rating = rating;
        }
        updatedHero.save();
    }

    async deleteHero(heroId: string) {
       const result =  await this.heroModel.deleteOne({_id: heroId}).exec();
       if (result.n === 0 ) {
           throw new NotFoundException('Could not found hero');
       }
    }

    private async findHero(id: string): Promise<Hero> {
        let hero;
        try {
            hero = await this.heroModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not found hero.')
        }
        if (!hero) {
            throw new NotFoundException('Could not find hero');
        }
        return hero;
    }
}

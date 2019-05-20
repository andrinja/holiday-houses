import { Amenity } from './amenity.model';

export class Property {
    public _id?: string;
    public name: string;
    public description: string;
    public imagePath: string;
    public address: string;
    public country: string;
    public amenities: Amenity[]

    constructor(name: string, 
                desc: string, 
                imagePath: string, 
                address: string, 
                country: string, 
                amenities: Amenity[]) 
    {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this. address = address;
        this.country = country;
        this.amenities = amenities;
    }
}


import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<ProductDocument>) {

  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.ProductModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.ProductModel.find().exec();
  }

  async one(id: string): Promise<Product> {
    return this.ProductModel.findById(id).exec();
  }

  async update(id: string, productDto: CreateProductDto): Promise<any>{
    return this.ProductModel.updateOne({ "_id": id }, productDto)
  }
  
  async delete(id: string): Promise<any>{
    return this.ProductModel.findByIdAndDelete(id)
  }
}

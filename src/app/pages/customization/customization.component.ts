import {Component} from '@angular/core';
import {ListSlide} from '../../models/componentes/slider';
import {ERole} from '../../enum/roles';
import {DataTests} from '../../../shared/dataTests';
import {ListProductConfig} from '../../components/sliders/slider-product/slider-product.component';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent {
  readonly l = ['Links', 'Slides', 'Cards', 'Lojas parceiras', 'Lista de produtos'];
  readonly sliderExample: ListSlide = {
    title: 'Exemplo',
    readRole: ERole.ADMIN,
    id: '1',
    itemsId: ['1', '2'],
    items: [
      {
        id: '1',
        index: 1,
        url: '',
        imageUrl: 'https://ms.yugipedia.com//thumb/9/9e/YuGiOhTheDarksideofDimensionsPoster.png/300px-YuGiOhTheDarksideofDimensionsPoster.png'
      },
      {
        id: '2',
        index: 2,
        url: '',
        imageUrl: 'https://img.elo7.com.br/product/zoom/1F3113E/big-poster-anime-yu-gi-oh-tamanho-90x-0-cm-lo23-cartaz.jpg'
      }
    ]
  };
  readonly productList: ListProductConfig = {
    maxHeight: 170,
    list: {
      id: '0',
      title: 'Lista de exemplo',
      itemsId: ['1', '2', '3'],
      readRole: ERole.ADMIN,
      items: DataTests.products
    },
    perView: 3,
    size: 'small'
  };
}

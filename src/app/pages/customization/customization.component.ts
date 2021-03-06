import {Component} from '@angular/core';
import {ERole} from '../../enum/roles';
import {DataTests} from '../../../shared/dataTests';
import {ListProductConfig} from '../../components/sliders/slider-product/slider-product.component';
import {routesFrontend} from '../../../shared/constants/routes-frontend';
import {Sequence} from '../../models/componentes/sequence';
import {Slide} from '../../models/componentes/slide';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss']
})
export class CustomizationComponent {
  readonly l = ['Links', 'Slides', 'Cards', 'Lojas parceiras', 'Lista de produtos'];
  readonly routes = routesFrontend;
  readonly sliderExample: Sequence<Slide> = {
    title: 'Exemplo',
    readRole: ERole.ADMIN,
    id: '1',
    itemsId: ['1', '2'],
    items: [
      {
        id: '1',
        index: 1,
        url: this.routes.customizeSlider,
        title: 'slide 1',
        imageUrl: 'https://ms.yugipedia.com//thumb/9/9e/YuGiOhTheDarksideofDimensionsPoster.png/300px-YuGiOhTheDarksideofDimensionsPoster.png'
      },
      {
        id: '2',
        index: 2,
        url: this.routes.customizeSlider,
        title: 'slide 2',
        imageUrl: 'https://img.elo7.com.br/product/zoom/1F3113E/big-poster-anime-yu-gi-oh-tamanho-90x-0-cm-lo23-cartaz.jpg'
      }
    ]
  };
  readonly productList: ListProductConfig = {
    maxHeight: 170,
    fnGetUrlProduct: productId => `/${routesFrontend.customizeProductList}`,
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

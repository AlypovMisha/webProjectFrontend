import { CarouselData } from '../types';

export const carouselApi = {
  async fetchCarouselData(): Promise<CarouselData> {
    try {

      //будет запрос к бэкенду
      
      //Заглушка
      return {
        slides: [
          {
            id: 1,
            type: 'dual',
            title: 'Слайд #1',
            description: 'Описание первого слайда',
            imageUrl: 'public/Screenshot_4.png',
            buttonText: 'Шопинг',
            order: 1
          },
          {
            id: 2,
            type: 'image',
            imageUrl: 'public/ad1.png',
            order: 2
          },
          {
            id: 3,
            type: 'image',   
            title: 'Новая коллекция',
            description: 'Успей купить первым',
            imageUrl: 'public/ad3.png',
            buttonText: 'Смотреть',
            order: 3
          }
        ],
        settings: {
          autoplay: true,
          autoplayInterval: 5000,
          infinite: true,
          height: '250px'
        }
      };
    } catch (error) {
      console.error('Error fetching carousel data:', error);
      throw error;
    }
  }
};
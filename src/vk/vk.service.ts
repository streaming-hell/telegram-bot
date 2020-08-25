import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class VkService {
  constructor(private readonly httpService: HttpService) {}

  public getSearchLink(query: string): string {
    const searchParams = new URLSearchParams({
      'c[q]': query,
      'c[per_page]': '200',
      'c[section]': 'audio',
    });
    return `https://vk.com/search?${searchParams}`;
  }
}

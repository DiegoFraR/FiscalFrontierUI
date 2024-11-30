import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentRatioDTO } from '../Models/current-Ratio';
import { QuickRationDTO } from '../Models/quick-Ratio';
import { AssetTurnoverDTO } from '../Models/asset-Turnover';
import { NetProfitDTO } from '../Models/net-Profit';
import { ReturnOnEquityDTO } from '../Models/return-On-Equity';
import { ReturnOnAssetDTO } from '../Models/return-On-Asset';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseurl = '/api/Sprint5'

  constructor(private http: HttpClient) { }
  getCurrentRatio(): Observable<CurrentRatioDTO> {
    return this.http.get<CurrentRatioDTO>(`${environment.apiBaseUrl}/api/Sprint5/CurrentRatio`);
  }

  
  getReturnOnAssets(): Observable<ReturnOnAssetDTO> {
    return this.http.get<ReturnOnAssetDTO>(`${environment.apiBaseUrl}/api/Sprint5/ReturnOnAssets`);
  }

  
  getReturnOnEquity(): Observable<ReturnOnEquityDTO> {
    return this.http.get<ReturnOnEquityDTO>(`${environment.apiBaseUrl}/api/Sprint5/ReturnOnEquity`);
  }

 
  getNetProfit(): Observable<NetProfitDTO> {
    return this.http.get<NetProfitDTO>(`${environment.apiBaseUrl}/api/Sprint5/NetProfit`);
  }

  
  getAssetTurnover(): Observable<AssetTurnoverDTO> {
    return this.http.get<AssetTurnoverDTO>(`${environment.apiBaseUrl}/api/Sprint5/AssetTurnover`);
  }

 
  getQuickRatio(): Observable<QuickRationDTO> {
    return this.http.get<QuickRationDTO>(`${environment.apiBaseUrl}/api/Sprint5/QuickRatio`);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentRatioDTO } from '../Models/current-Ratio';
import { QuickRationDTO } from '../Models/quick-Ratio';
import { AssetTurnoverDTO } from '../Models/asset-Turnover';
import { NetProfitDTO } from '../Models/net-Profit';
import { ReturnOnEquityDTO } from '../Models/return-On-Equity';
import { ReturnOnAssetDTO } from '../Models/return-On-Asset';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseurl = '/api/Sprint5'

  constructor(private http: HttpClient) { }
  getCurrentRatio(): Observable<CurrentRatioDTO> {
    return this.http.get<CurrentRatioDTO>(`${this.baseurl}/CurrentRatio`);
  }

  
  getReturnOnAssets(): Observable<ReturnOnAssetDTO> {
    return this.http.get<ReturnOnAssetDTO>(`${this.baseurl}/ReturnOnAssets`);
  }

  
  getReturnOnEquity(): Observable<ReturnOnEquityDTO> {
    return this.http.get<ReturnOnEquityDTO>(`${this.baseurl}/ReturnOnEquity`);
  }

 
  getNetProfit(): Observable<NetProfitDTO> {
    return this.http.get<NetProfitDTO>(`${this.baseurl}/NetProfit`);
  }

  
  getAssetTurnover(): Observable<AssetTurnoverDTO> {
    return this.http.get<AssetTurnoverDTO>(`${this.baseurl}/AssetTurnover`);
  }

 
  getQuickRatio(): Observable<QuickRationDTO> {
    return this.http.get<QuickRationDTO>(`${this.baseurl}/QuickRatio`);
  }
}


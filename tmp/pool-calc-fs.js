var VersionPoolCalc=105,
SubVersion=2,
M_DBb_Sm=Array(5),
M_DBb_Wn=Array(5),
iMaxM_Sm,iMaxM_Wn,
MMaxM_Sm,MMaxM_Wn,
M_Dp,
M_Dp_Sm,
M_Dp_Wn,
M_Mn_Sm,
M_Mn_Wn,
M_Add_Sm,
M_Add_Wn,
M_Sum_Sm,
M_Sum_Wn,B_B,B_Bg,P_DW,P_DL,kWave,kWAttr,dB_A,k_a,
AirParam_Sm=Array(5),
AirParam_Wn=Array(5),objSelAuto,objRegion,objCity,objPress,objPVSm,objAvTSm,objAvTWn,objHumOutWn,objTextTSm,objTextPVSm,objSMount,
objVHall,objSelAutoInPar,objIsCover,objWork,objRsHNWSm,objRsHNWWn,objTWater,objPlType,objTAir,objSWater,objInHumSm,objSTrack,objInHumWn,
objWAttr,objNGuest,objNSwim,objRsH0Sm,objRsH0Wn,objRsH1Sm,objRsH1Wn,objRsH2Sm,objRsH2Wn,objRsHRdSm,objRsHRdWn,objRsHAllSm,objRsHAllWn,objTRNGuest,objTRSTrack,objTRSMount,objTRResTrSm,objTextCity,
objTextRegion,objTextSTrack,objTextNSwimm,objTextSMount,objTextNGuest,objTextType,objResHumSm,objResHumWn,objTextRTrSm,objTextRTrWn,objAirgySm,objAirgyWn,objAHUHum,objRsL0Sm,objRsL0Wn,objRsL1Sm,
objRsL1Wn,objRsLAllSm,objRsLAllWn,objRsLCommSm,objRsLCommWn,L_Sm=Array(7),L_Wn=Array(7),LMax_Sm,LMax_Wn,iL_Sm,iL_Wn,
MAir_Sm,MAir_Wn,LComm,objAHULComm,objAHULInf,objAHUPwr,objTextAHULComm,objTextAHULInf,objTextAHUPwr,objTextAHUHum,objAHULComm2,objAHULInf2,objAHUPwr2,objTRAttrExp,objAttrExp,objRsHAvrSm,
objRsHAvrWn,Airgy_Sm,Airgy_Wn,k,Wiw,IsCorrectHum,objHContOutSm,objHContOutWn,objHConInSm,objHContInWn,iTypePool,Press,PVSm,HumSm,AvTSm,AvTWn,HumOutWn,Wi,SMount,VHall,LCommMax,LCommV6,
IsV4V6=Array(3),LInfMin,LInfMax,PwrMax,LInf_Sm,LInf_Wn,LInf2,LComm2,PwrMax2,TWater,PlType,TAir,SWater,InHumSm,STrack,InHumWn,WAttr,NGuest,
NSwim,IsRDew,dB_NW,WorkTime,M_NW_Sm,M_NW_Wn,NSwim_Max,M_SumAvrM_Sm,M_SumAvrM_Wn,objTRTooHot1,objTRTooHot2,objHComment0,objHComment1,objHComment2,MassDewInSM1,MassDewInSM2,IsDewInSM1,IsDewInSM2,
AddM_Sum,HumCap2_Sm,HumCap2_Wn,HumCap_Sm,HumCap_Wn,HumCap_Max,JSumm,IsTooHot,kLInf=5,sM2="\u043c&sup2;";

console.group("INIT");
console.log("M_SumAvrM_Sm = " + M_SumAvrM_Wn + "\n" + 
			"TAir = " + TAir + "\n" + 
			"InHumSm = " + InHumSm + "\n" +
			"AvTSm = " + AvTSm + "\n" +
			"PVSm = " + PVSm + "\n" +
			"Press = " + Press);
console.groupEnd("INIT");

function Init_Pool_Data(){
  Init_Var();
  //TestPlace();
  Calc_ShowHideAuto();
  objSelAuto.checked&&Init_Region();
  check_pl_ainpar();
  Init_TypePool();
  calc_pool_main()
}
function proc_onfocus(){document.getElementById("Text_button").innerHTML="\u0414\u0430\u043d\u043d\u044b\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u044b, \u0434\u043b\u044f \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u0440\u0430\u0441\u0447\u0435\u0442\u0430 \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u043a\u043d\u043e\u043f\u043a\u0443 &laquo;\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0442\u044c&raquo; &rarr;"}
console.log("point 1: calc_pool_main() will called...");

function calc_pool_main(){
	document.getElementById("Text_button").innerHTML="";
	Read_Vars();
	var b=4;
	Wi.substr(0,3)!=TestStr&&(b=0);
	Wi=Wi.substr(b,8);
	if(PoolActive()){
		k_a=.3+.1*iTypePool;
		B_B=B_B_Arr[iTypePool];
		B_Bg=B_B+dB_A;M_DBb_Sm[0]=CalcWaterGeneration(B_Bg,TWater,TAir,InHumSm,SWater);
		M_DBb_Wn[0]=CalcWaterGeneration(B_Bg,TWater,TAir,InHumWn,SWater);
		M_DBb_Sm[1]=FormulaBiazinKrumme(TWater,TAir,InHumSm,SWater,k_a,1);
		M_DBb_Wn[1]=FormulaBiazinKrumme(TWater,TAir,InHumWn,SWater,k_a,1);
		M_DBb_Sm[2]=.1*SWater;
		M_DBb_Wn[2]=.1*SWater;
		for(var a=MMaxM_Wn=MMaxM_Sm=0;2>a;a++)
			MMaxM_Sm<M_DBb_Sm[a]&&(MMaxM_Sm=M_DBb_Sm[a],iMaxM_Sm=a),MMaxM_Wn<M_DBb_Wn[a]&&(MMaxM_Wn=M_DBb_Wn[a],iMaxM_Wn=a);
		M_NW_Sm=CalcWaterGeneration(dB_NW,TWater,TAir,InHumSm,SWater);
		M_NW_Wn=CalcWaterGeneration(dB_NW,TWater,TAir,InHumWn,SWater);
		0==iTypePool?M_Add_Wn=M_Add_Sm=M_Mn_Wn=M_Mn_Sm=M_Dp_Wn=M_Dp_Sm=0:(M_Dp_Sm=CalcWaterGenFromTrack(TAir,InHumSm,STrack,Press),M_Dp_Wn=CalcWaterGenFromTrack(TAir,InHumWn,STrack,Press),M_Mn_Sm=CalcWaterGeneration(B_B_Arr[2],
		TWater,TAir,InHumSm,SMount),M_Mn_Wn=CalcWaterGeneration(B_B_Arr[2],TWater,TAir,InHumWn,SMount),M_Add_Sm=1*M_Dp_Sm+1*M_Mn_Sm,M_Add_Wn=1*M_Dp_Wn+1*M_Mn_Wn);
		M_Sum_Sm=1*MMaxM_Sm+1*M_Add_Sm;
		M_Sum_Wn=1*MMaxM_Wn+1*M_Add_Wn;
		b=NSwim/NSwim_Max;1<b&&(b=1);
		M_SumAvrM_Sm=1*(MMaxM_Sm*(.2*b+.8)+1*M_Add_Sm).toFixed(1);
		console.log("M_SumAvrM_Sm = " + M_SumAvrM_Sm);
		M_SumAvrM_Wn=1*(MMaxM_Wn*(.2*b+.8)+1*M_Add_Wn).toFixed(1);
		console.log("M_SumAvrM_Wn = " + M_SumAvrM_Wn);
		
		console.log("--- AirParam_Sm ---");
		/*console.log("point _: M_SumAvrM_Sm = " + M_SumAvrM_Wn + "\n" + 
			"TAir = " + TAir + "\n" + 
			"InHumSm = " + InHumSm + "\n" +
			"AvTSm = " + AvTSm + "\n" +
			"PVSm = " + PVSm + "\n" +
			"Press = " + Press);*/
			
		AirParam_Sm=CalcMAirForAH(M_SumAvrM_Sm,TAir,InHumSm,AvTSm,PVSm,Press);

		MAir_Sm=AirParam_Sm[0];0<MAir_Sm?(IsCorrectHum=1,L_Sm[0]=MAir_Sm/DensAirNom):
		IsCorrectHum=L_Sm[0]=0;b=PressVapor(AvTWn)*HumOutWn/100;
		
		console.log("point _: M_SumAvrM_Wn = " + M_SumAvrM_Wn + "\n" + 
			"TAir = " + TAir + "\n" + 
			"InHumWn = " + InHumWn + "\n" +
			"AvTWn = " + AvTWn + "\n" +
			"b = " + b + "\n" +
			"Press = " + Press);
			
		
		AirParam_Wn=CalcMAirForAH(M_SumAvrM_Wn,TAir,InHumWn,AvTWn,b,Press);
		console.log("point _: AirParam_Wn = " + AirParam_Wn);
		MAir_Wn=AirParam_Wn[0];
		
		0<MAir_Wn?L_Wn[0]=MAir_Wn/DensAirNom:(L_Wn[0]=0,IsCorrectHum=-1);L_Sm[1]=80*NSwim+20*NGuest;L_Wn[1]=L_Sm[1];LInf2=L_Sm[1];LComm=4*VHall;LCommV6=6*VHall;L_Sm[2]=LComm;L_Wn[2]=LComm;for(a=LInf_Wn=LInf_Sm=0;2>a;a++)LInf_Sm<L_Sm[a]&&(LInf_Sm=L_Sm[a],iL_Sm=a),LInf_Wn<L_Wn[a]&&(LInf_Wn=L_Wn[a],iL_Wn=a);LInfMax=MaxVal(LInf_Sm,LInf_Wn);LInfMin=MinVal(LInf_Sm,LInf_Wn);
		AddM_Sum=-1>MAir_Sm?1*(-M_SumAvrM_Sm*L_Sm[1]/(MAir_Sm/DensAirNom)).toFixed(1):0;
		for(a=LMax_Wn=LMax_Sm=0;3>a;a++)LMax_Sm<L_Sm[a]&&(LMax_Sm=L_Sm[a]),LMax_Wn<L_Wn[a]&&(LMax_Wn=L_Wn[a]);
		IsRDew=IsDewInSM1=MassDewInSM1=0;
		if(.99*LMax_Wn>LInf_Wn){
			var a=DensAirNom*(LMax_Wn-LInf_Wn),c=DensAirNom*LInf_Wn,d,e,f,g;
			d=HumContTj(Press,TAir,InHumWn);
			e=HumContTj(Press,AvTWn,HumOutWn);f=Enthalpy(TAir,d);
			g=Enthalpy(AvTWn,e);a=MixAir(Press,a,c,f,g,d,e);
			MassDewInSM1=a[0];0<MassDewInSM1&&(IsDewInSM1=1)
		}
		LCommMax=MaxVal(LMax_Sm,LMax_Wn);
		IsV4V6[1]=LCommMax<.99*LCommV6?1:0;
		LComm2=MaxVal(LInf2,LComm);
		IsV4V6[2]=LComm2<.99*LCommV6?1:0;IsRDew=IsDewInSM2=MassDewInSM2=0;
		.99*LComm2>LInf2&&(a=DensAirNom*(LComm2-LInf2),c=DensAirNom*LInf2,d=HumContTj(Press,TAir,InHumWn),e=HumContTj(Press,AvTWn,HumOutWn),f=Enthalpy(TAir,d),g=Enthalpy(AvTWn,e),a=MixAir(Press,a,c,f,g,d,e),MassDewInSM2=a[0],0<MassDewInSM2&&(IsDewInSM2=1));IsCorrectHum&&(Airgy_Sm=EnergyHeatAir(AvTSm,TAir,PVSm,LInf_Sm*DensAirNom,Press),Airgy_Wn=EnergyHeatAir(AvTWn,TAir,b,
		LInf_Wn*DensAirNom,Press),PwrMax=MaxVal(Airgy_Sm,Airgy_Wn));
		PwrMax2=EnergyHeatAir(AvTWn,TAir,b,LInf2*DensAirNom,Press);
		HumCap2_Sm=1==IsCorrectHum?M_SumAvrM_Sm*(L_Sm[0]-LInf2)/L_Sm[0]:M_SumAvrM_Sm+AddM_Sum;HumCap2_Wn=M_SumAvrM_Wn*(L_Wn[0]-LInf2)/L_Wn[0];HumCap_Sm=HumCap2_Sm;HumCap_Wn=HumCap2_Wn}
		Show_ResParam()
}

function TestPlace(){window.location.href!=BasePoolURL&&(window.location.href=BasePoolURL)}

function Show_ResParam(){
	//try{
		var b;
		document.getElementById("print_header").innerHTML="\u0420\u0424\u041a \u041a\u043b\u0438\u043c\u0430\u0442. \u041a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440 \u0434\u043b\u044f \u0440\u0430\u0441\u0447\u0435\u0442\u0430 \u0432\u0435\u043d\u0442\u0438\u043b\u044f\u0446\u0438\u0438 \u0431\u0430\u0441\u0441\u0435\u0439\u043d\u0430. \u0412\u0435\u0440\u0441\u0438\u044f "+(VersionPoolCalc/100).toFixed(0)+"."+(VersionPoolCalc%100).toFixed(0)+"."+SubVersion;
		.1>Math.abs(TWater-TAir)?
			document.getElementById("Text_Warn_PoolPar").innerHTML="\u0422 \u0432\u043e\u0437\u0434\u0443\u0445\u0430 \u0440\u0430\u0432\u043d\u0430 \u0422 \u0432\u043e\u0434\u044b, \u0432\u044b\u0441\u043e\u043a\u043e\u0435 \u0432\u043b\u0430\u0433\u043e\u0432\u044b\u0434\u0435\u043b\u0435\u043d\u0438\u0435!"
		:
			TWater>TAir?
				document.getElementById("Text_Warn_PoolPar").innerHTML="\u0422 \u0432\u043e\u0437\u0434\u0443\u0445\u0430 \u043c\u0435\u043d\u044c\u0448\u0435 \u0422 \u0432\u043e\u0434\u044b, \u0432\u044b\u0441\u043e\u043a\u043e\u0435 \u0432\u043b\u0430\u0433\u043e\u0432\u044b\u0434\u0435\u043b\u0435\u043d\u0438\u0435!"
			:
			document.getElementById("Text_Warn_PoolPar").innerHTML="";
		objHContOutSm.innerHTML=AirParam_Sm[1].toFixed(1)+" \u0433/\u043a\u0433";
		objHContOutWn.innerHTML=AirParam_Wn[1].toFixed(1)+" \u0433/\u043a\u0433";
		objHConInSm.innerHTML=AirParam_Sm[2].toFixed(1)+" \u0433/\u043a\u0433";
		objHContInWn.innerHTML=AirParam_Wn[2].toFixed(1)+" \u0433/\u043a\u0433";
		objRsH0Sm.style.color=0==iMaxM_Sm?ColorGreen:ColorPassive;
		objRsH1Sm.style.color=1==iMaxM_Sm?ColorGreen:ColorPassive;
		objRsH0Wn.style.color=0==iMaxM_Wn?ColorGreen:ColorPassive;
		objRsH1Wn.style.color=1==iMaxM_Wn?ColorGreen:ColorPassive;
		objRsH0Sm.innerHTML=M_DBb_Sm[0].toFixed(1)+" \u043a\u0433/\u0447";
		objRsH0Wn.innerHTML=M_DBb_Wn[0].toFixed(1)+" \u043a\u0433/\u0447";
		objRsH1Sm.innerHTML=M_DBb_Sm[1].toFixed(1)+" \u043a\u0433/\u0447";
		objRsH1Wn.innerHTML=M_DBb_Wn[1].toFixed(1)+" \u043a\u0433/\u0447";
		0==iTypePool?(
			objRsHRdSm.innerHTML="&nbsp;&ndash;",objRsHRdWn.innerHTML="&nbsp;&ndash;",objRsHRdSm.style.color=ColorDisable,objRsHRdWn.style.color=ColorDisable,objTextRTrSm.style.color=ColorDisable,objTextRTrWn.style.color=ColorDisable
			):(
			objRsHRdSm.innerHTML=M_Add_Sm.toFixed(1)+" \u043a\u0433/\u0447",objRsHRdWn.innerHTML=M_Add_Wn.toFixed(1)+" \u043a\u0433/\u0447",objRsHRdSm.style.color=ColorGreen,objRsHRdWn.style.color=ColorGreen,objTextRTrSm.style.color=ColorActive,objTextRTrWn.style.color=ColorActive);
		3==iTypePool?(
			objTextRTrSm.innerHTML="\u0412\u043b\u0430\u0433\u043e\u0432\u044b\u0434. \u043e\u0442 \u043e\u0431\u0445\u043e\u0434\u043d. \u0434\u043e\u0440. \u0438 \u0433\u043e\u0440\u043e\u043a",
			objTextRTrWn.innerHTML="\u0412\u043b\u0430\u0433\u043e\u0432\u044b\u0434. \u043e\u0442 \u043e\u0431\u0445. \u0434\u043e\u0440. \u0438 \u0433\u043e\u0440\u043e\u043a"
			):(
			objTextRTrSm.innerHTML="\u0412\u043b\u0430\u0433\u043e\u0432\u044b\u0434\u0435\u043b\u0435\u043d\u0438\u0435 \u043e\u0442 \u043e\u0431\u0445\u043e\u0434\u043d. \u0434\u043e\u0440\u043e\u0436\u0435\u043a",objTextRTrWn.innerHTML="\u0412\u043b\u0430\u0433\u043e\u0432\u044b\u0434. \u043e\u0442 \u043e\u0431\u0445\u043e\u0434\u043d. \u0434\u043e\u0440\u043e\u0436\u0435\u043a"
			);
			
		objRsHAllSm.innerHTML="<nobr>"+M_Sum_Sm.toFixed(1)+" \u043a\u0433/\u0447</nobr>";
		objRsHAllWn.innerHTML="<nobr>"+M_Sum_Wn.toFixed(1)+" \u043a\u0433/\u0447</nobr>";
		objRsHAvrSm.innerHTML="<nobr>"+M_SumAvrM_Sm.toFixed(1)+" \u043a\u0433/\u0447</nobr>";
		objRsHAvrWn.innerHTML="<nobr>"+M_SumAvrM_Wn.toFixed(1)+" \u043a\u0433/\u0447</nobr>";
		objRsHNWSm.innerHTML="<nobr>"+M_NW_Sm.toFixed(1)+" \u043a\u0433/\u0447</nobr>";
		objRsHNWWn.innerHTML="<nobr>"+M_NW_Wn.toFixed(1)+" \u043a\u0433/\u0447</nobr>";
		0<IsCorrectHum?(
			objTextAHULComm.innerHTML="\u041e\u0431\u0449\u0430\u044f \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u0432\u0435\u043d\u0442\u0438\u043b\u044f\u0446\u0438\u043e\u043d\u043d\u043e\u0439 \u0443\u0441\u0442\u043d\u043e\u0432\u043a\u0438 (\u043f\u0440\u0438\u0442\u043e\u043a&nbsp;+&nbsp;\u0440\u0435\u0446\u0438\u0440\u043a\u0443\u043b\u044f\u0446\u0438\u044f)*",objTextAHUPwr.innerHTML="\u0422\u0440\u0435\u0431\u0443\u0435\u043c\u0430\u044f \u043c\u043e\u0449\u043d\u043e\u0441\u0442\u044c \u043a\u0430\u043b\u043e\u0440\u0438\u0444\u0435\u0440\u0430 (\u0431\u0435\u0437 \u0443\u0447\u0435\u0442\u0430 \u0440\u0435\u043a\u0443\u043f\u0435\u0440\u0430\u0446\u0438\u0438 \u0442\u0435\u043f\u043b\u0430)",
			objRsL0Sm.style.color=0==iL_Sm?ColorGreen:ColorPassive,objRsL1Sm.style.color=1==iL_Sm?ColorGreen:ColorPassive,objRsL0Wn.style.color=0==iL_Wn?ColorGreen:ColorPassive,objRsL1Wn.style.color=1==iL_Wn?ColorGreen:ColorPassive,objRsL0Sm.innerHTML=FormatNumber(10*(L_Sm[0]/10).toFixed(0))+" \u043c&sup3;/\u0447",objRsL0Wn.innerHTML=FormatNumber(10*(L_Wn[0]/10).toFixed(0))+" \u043c&sup3;/\u0447",objRsL1Sm.innerHTML=FormatNumber(10*(L_Sm[1]/10).toFixed(0))+" \u043c&sup3;/\u0447",objRsL1Wn.innerHTML=FormatNumber(10*
			(L_Wn[1]/10).toFixed(0))+" \u043c&sup3;/\u0447",110>=LInfMax-LInfMin?(objTextAHULInf.innerHTML="\u0420\u0430\u0441\u0445\u043e\u0434 \u043d\u0430\u0440\u0443\u0436\u043d\u043e\u0433\u043e (\u043f\u0440\u0438\u0442\u043e\u0447\u043d\u043e\u0433\u043e) \u0432\u043e\u0437\u0434\u0443\u0445\u0430",objAHULInf.innerHTML=FormatNumber(10*(LInfMax/10).toFixed(0))+" \u043c&sup3;/\u0447"):(objTextAHULInf.innerHTML="\u0420\u0435\u0433\u0443\u043b\u0438\u0440\u0443\u0435\u043c\u044b\u0439 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u0440\u0430\u0441\u0445\u043e\u0434\u0430 \u043d\u0430\u0440\u0443\u0436\u043d\u043e\u0433\u043e (\u043f\u0440\u0438\u0442\u043e\u0447\u043d\u043e\u0433\u043e) \u0432\u043e\u0437\u0434\u0443\u0445\u0430 (\u0437\u0438\u043c\u0430 &ndash; \u043b\u0435\u0442\u043e)",
			objAHULInf.innerHTML=FormatNumber(10*(LInfMin/10).toFixed(0))+" &ndash; "+FormatNumber(10*(LInfMax/10).toFixed(0))+" \u043c&sup3;/\u0447"),objAHULComm.innerHTML=0==IsV4V6[1]?FormatNumber(10*(LCommMax/10).toFixed(0))+" \u043c&sup3;/\u0447":FormatNumber(10*(LCommMax/10).toFixed(0))+" &ndash; "+FormatNumber(10*(LCommV6/10).toFixed(0))+" \u043c&sup3;/\u0447",b=10>PwrMax?1:0,objAHUPwr.innerHTML=FormatNumber(PwrMax.toFixed(b))+" \u043a\u0412\u0442"
			):(
			objRsL0Sm.style.color=ColorPassive,objRsL0Wn.style.color=
			ColorPassive,objRsL1Sm.style.color=ColorGreen,objRsL1Wn.style.color=ColorGreen,objRsL0Sm.innerHTML=" &ndash;",objRsL0Wn.innerHTML=0>IsCorrectHum?" &ndash;":FormatNumber(10*(L_Wn[0]/10).toFixed(0))+" \u043c&sup3;/\u0447",objRsL1Sm.innerHTML=FormatNumber(10*(L_Sm[1]/10).toFixed(0))+" \u043c&sup3;/\u0447",objRsL1Wn.innerHTML=FormatNumber(10*(L_Wn[1]/10).toFixed(0))+" \u043c&sup3;/\u0447",objAHULComm.innerHTML="",objAHULInf.innerHTML="",objAHUPwr.innerHTML="",objTextAHULComm.innerHTML='<span style="color:#FF9B00;">\u0412\u044b\u0441\u043e\u043a\u043e\u0435 \u0432\u043b\u0430\u0433\u043e\u0441\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u0435 \u043d\u0430\u0440\u0443\u0436\u043d\u043e\u0433\u043e \u0432\u043e\u0437\u0434\u0443\u0445\u0430, \u043e\u0441\u0443\u0448\u0435\u043d\u0438\u0435 \u0430\u0441\u0441\u0438\u043c\u0438\u043b\u044f\u0446\u0438\u0435\u0439 \u043d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e!<span>',
			objTextAHULInf.innerHTML="\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0432\u0435\u043d\u0442\u0438\u043b\u044f\u0446\u0438\u043e\u043d\u043d\u0443\u044e \u0441\u0438\u0441\u0442\u0435\u043c\u0443 \u0441 \u043e\u0441\u0443\u0448\u0438\u0442\u0435\u043b\u0435\u043c \u0432\u043e\u0437\u0434\u0443\u0445\u0430",objTextAHUPwr.innerHTML=""
			);
		objTRTooHot2.className=IsTooHot?"":"hiddentype";objTRTooHot1.className=0<IsCorrectHum&&IsTooHot?"":"hiddentype";
		HumCap_Max=MaxVal(HumCap2_Sm,HumCap2_Wn);
		var a;
		a=HumCap2_Sm>=HumCap2_Wn?InHumSm:InHumWn;
		b=M_SumAvrM_Sm.toFixed(1)-HumCap_Sm.toFixed(1);
		var c=M_SumAvrM_Wn.toFixed(1)-HumCap_Wn.toFixed(1);
		1==IsCorrectHum?(
			objHComment1.innerHTML="\u0414\u043b\u044f \u0441\u043f\u0440\u0430\u0432\u043a\u0438: \u0441\u0440\u0435\u0434\u043d\u0435\u0435 \u0432\u043b\u0430\u0433\u043e\u0432\u044b\u0434\u0435\u043b\u0435\u043d\u0438\u0435 \u0432 \u0440\u0430\u0431\u043e\u0447\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u0441\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 <b>"+
			M_SumAvrM_Sm.toFixed(1)+" \u043a\u0433/\u0447</b> \u043b\u0435\u0442\u043e\u043c \u0438 <b>"+M_SumAvrM_Wn.toFixed(1)+" \u043a\u0433/\u0447</b> \u0437\u0438\u043c\u043e\u0439,",objHComment2.innerHTML="\u0438\u0437 \u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u0430\u0441\u0441\u0438\u043c\u0438\u043b\u044f\u0446\u0438\u0435\u0439 \u0432\u043b\u0430\u0433\u0438 \u043f\u0440\u0438\u0442\u043e\u0447\u043d\u044b\u043c \u0432\u043e\u0437\u0434\u0443\u0445\u043e\u043c \u0443\u0434\u0430\u043b\u044f\u0435\u0442\u0441\u044f <b>"+
			b.toFixed(1)+" \u043a\u0433/\u0447</b> \u043b\u0435\u0442\u043e\u043c \u0438 <b>"+c.toFixed(1)+" \u043a\u0433/\u0447</b> \u0437\u0438\u043c\u043e\u0439.",objHComment0.innerHTML="\u0421\u043d\u0438\u0436\u0435\u043d\u0438\u0435 \u0432\u043b\u0430\u0436\u043d\u043e\u0441\u0442\u0438 \u0432\u043e\u0437\u0434\u0443\u0445\u0430 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0441\u044f \u043a\u043e\u043d\u0434\u0435\u043d\u0441\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u043c \u043e\u0441\u0443\u0448\u0438\u0442\u0435\u043b\u0435\u043c \u0432\u043e\u0437\u0434\u0443\u0445\u0430, \u0447\u0430\u0441\u0442\u044c \u0432\u043b\u0430\u0433\u0438 \u0443\u0434\u0430\u043b\u044f\u0435\u0442\u0441\u044f \u043f\u0443\u0442\u0435\u043c \u0435\u0451 \u0430\u0441\u0441\u0438\u043c\u0438\u043b\u044f\u0446\u0438\u0438 \u043f\u0440\u0438\u0442\u043e\u0447\u043d\u044b\u043c \u0432\u043e\u0437\u0434\u0443\u0445\u043e\u043c (\u043f\u0440\u0438\u0442\u043e\u0447\u043d\u044b\u0439 \u0432\u043e\u0437\u0434\u0443\u0445 \u043f\u043e\u0434\u0430\u0435\u0442\u0441\u044f \u043f\u043e&nbsp;\u0441\u0430\u043d\u0438\u0442\u0430\u0440\u043d\u044b\u043c \u043d\u043e\u0440\u043c\u0430\u043c). \u0414\u043b\u044f \u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0435\u043d\u0438\u044f \u043f\u043e\u0434\u0432\u0438\u0436\u043d\u043e\u0441\u0442\u0438 \u0432\u043e\u0437\u0434\u0443\u0445\u0430 \u043e\u0431\u0449\u0438\u0439 \u0440\u0430\u0441\u0445\u043e\u0434 \u0432\u043e\u0437\u0434\u0443\u0445\u0430 (\u043f\u0440\u0438\u0442\u043e\u043a&nbsp;+&nbsp;\u0440\u0435\u0446\u0438\u0440\u043a\u0443\u043b\u044f\u0446\u0438\u044f) \u0434\u043e\u043b\u0436\u0435\u043d \u0431\u044b\u0442\u044c \u043d\u0435&nbsp;\u043c\u0435\u043d\u0435\u0435 "+
			FormatNumber(10*(LComm2/10).toFixed(0))+" \u043c&sup3;/\u0447*."
			):0<AddM_Sum?(
			objHComment1.innerHTML="\u0414\u043b\u044f \u0441\u043f\u0440\u0430\u0432\u043a\u0438: \u043b\u0435\u0442\u043e\u043c \u0432\u043b\u0430\u0433\u043e\u0441\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u0435 \u043d\u0430\u0440\u0443\u0436\u043d\u043e\u0433\u043e \u0432\u043e\u0437\u0434\u0443\u0445\u0430 \u0432\u044b\u0448\u0435, \u0447\u0435\u043c \u0432\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u0435\u0433\u043e, \u043f\u043e\u044d\u0442\u043e\u043c\u0443",
			objHComment2.innerHTML="\u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u043e\u0441\u0443\u0448\u0438\u0442\u0435\u043b\u044f \u0443\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u0430 \u043d\u0430 <b>"+AddM_Sum.toFixed(1)+" \u043a\u0433/\u0447</b> \u0434\u043b\u044f \u043a\u043e\u043c\u043f\u0435\u043d\u0441\u0430\u0446\u0438\u0438 \u0432\u043b\u0430\u0433\u043e\u043f\u0440\u0438\u0442\u043e\u043a\u0430."
			):(
			objHComment1.innerHTML="\u0414\u043b\u044f \u0441\u043f\u0440\u0430\u0432\u043a\u0438: \u0441\u0440\u0435\u0434\u043d\u0435\u0435 \u0432\u043b\u0430\u0433\u043e\u0432\u044b\u0434\u0435\u043b\u0435\u043d\u0438\u0435 \u0432 \u0440\u0430\u0431\u043e\u0447\u0435\u0435 \u0432\u0440\u0435\u043c\u044f \u0441\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 <b>"+
			M_SumAvrM_Sm.toFixed(1)+" \u043a\u0433/\u0447</b> \u043b\u0435\u0442\u043e\u043c \u0438 <b>"+M_SumAvrM_Wn.toFixed(1)+" \u043a\u0433/\u0447</b> \u0437\u0438\u043c\u043e\u0439, \u0438\u0437-\u0437\u0430 \u0432\u044b\u0441\u043e\u043a\u043e\u0433\u043e",objHComment2.innerHTML="\u0432\u043b\u0430\u0433\u043e\u0441\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u044f \u043d\u0430\u0440\u0443\u0436\u043d\u043e\u0433\u043e \u0432\u043e\u0437\u0434\u0443\u0445\u0430 \u043b\u0435\u0442\u043e\u043c \u0430\u0441\u0441\u0438\u043c\u0438\u043b\u044f\u0446\u0438\u044f \u0432\u043b\u0430\u0433\u0438 \u043d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u0430 (\u0437\u0438\u043c\u043e\u0439 \u0430\u0441\u0441\u0438\u043c\u0438\u043b\u0438\u0440\u0443\u0435\u0442\u0441\u044f <b>"+
			c.toFixed(1)+" \u043a\u0433/\u0447</b>)."
			);
		b=10>PwrMax2?1:0;
		objAHULInf2.innerHTML=FormatNumber(10*(LInf2/10).toFixed(0))+" \u043c&sup3;/\u0447";
		objAHUPwr2.innerHTML=FormatNumber(PwrMax2.toFixed(b))+" \u043a\u0412\u0442";
		objTextAHUHum.innerHTML="\u0422\u0440\u0435\u0431\u0443\u0435\u043c\u0430\u044f \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u043e\u0441\u0443\u0448\u0438\u0442\u0435\u043b\u044f \u0432\u043e\u0437\u0434\u0443\u0445\u0430 \u043f\u0440\u0438 T="+
		TAir+"&deg;C \u0438 &phi;="+a+"%";
		objAHUHum.innerHTML=HumCap_Max.toFixed(1)+" \u043a\u0433/\u0447";
		a=0==IsV4V6[1]?LCommMax:LCommV6;IsDewInSM1?(document.getElementById("TR_IsDewSM1").className="",a=LInfMin*kLInf>=a?"\u041a\u043e\u043d\u0434\u0435\u043d\u0441\u0430\u0446\u0438\u044f \u0432\u043b\u0430\u0433\u0438 \u0432 \u0441\u043c\u0435\u0441\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u043a\u0430\u043c\u0435\u0440\u0435 \u0432 \u0437\u0438\u043c\u043d\u0438\u0439 \u043f\u0435\u0440\u0438\u043e\u0434 \u0438 \u0440\u0438\u0441\u043a \u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u0435 \u043b\u044c\u0434\u0430!":
		LInfMin*kLInf>LCommMax?"\u041a\u043e\u043d\u0434\u0435\u043d\u0441\u0430\u0446\u0438\u044f \u0432\u043b\u0430\u0433\u0438 \u0432 \u0441\u043c\u0435\u0441\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u043a\u0430\u043c\u0435\u0440\u0435 \u0432 \u0437\u0438\u043c\u043d\u0438\u0439 \u043f\u0435\u0440\u0438\u043e\u0434 \u0438 \u0440\u0438\u0441\u043a \u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u0435 \u043b\u044c\u0434\u0430 \u043f\u0440\u0438 \u043e\u0431\u0449\u0435\u043c \u0440\u0430\u0441\u0445\u043e\u0434\u0435 \u043c\u0435\u043d\u0435\u0435 "+
		FormatNumber(10*(LInfMin*kLInf/10).toFixed(0))+" \u043c&sup3;/\u0447":"\u041a\u043e\u043d\u0434\u0435\u043d\u0441\u0430\u0446\u0438\u044f \u0432\u043b\u0430\u0433\u0438 \u0432 \u0441\u043c\u0435\u0441\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u043a\u0430\u043c\u0435\u0440\u0435 \u0432 \u0437\u0438\u043c\u043d\u0438\u0439 \u043f\u0435\u0440\u0438\u043e\u0434!",document.getElementById("Text_DewSM1").innerHTML=a):document.getElementById("TR_IsDewSM1").className="hiddentype";a=0==IsV4V6[2]?LComm2:
		LCommV6;IsDewInSM2?(document.getElementById("TR_IsDewSM2").className="",a=LInfMin*kLInf>=a?"\u041a\u043e\u043d\u0434\u0435\u043d\u0441\u0430\u0446\u0438\u044f \u0432\u043b\u0430\u0433\u0438 \u0432 \u0441\u043c\u0435\u0441\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u043a\u0430\u043c\u0435\u0440\u0435 \u0432 \u0437\u0438\u043c\u043d\u0438\u0439 \u043f\u0435\u0440\u0438\u043e\u0434 \u0438 \u0440\u0438\u0441\u043a \u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u0435 \u043b\u044c\u0434\u0430!":
		LInfMin*kLInf>LComm2?"\u041a\u043e\u043d\u0434\u0435\u043d\u0441\u0430\u0446\u0438\u044f \u0432\u043b\u0430\u0433\u0438 \u0432 \u0441\u043c\u0435\u0441\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u043a\u0430\u043c\u0435\u0440\u0435 \u0432 \u0437\u0438\u043c\u043d\u0438\u0439 \u043f\u0435\u0440\u0438\u043e\u0434 \u0438 \u0440\u0438\u0441\u043a \u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u0435 \u043b\u044c\u0434\u0430 \u043f\u0440\u0438 \u043e\u0431\u0449\u0435\u043c \u0440\u0430\u0441\u0445\u043e\u0434\u0435 \u043c\u0435\u043d\u0435\u0435 "+
		FormatNumber(10*(LInfMin*kLInf/10).toFixed(0))+" \u043c&sup3;/\u0447":"\u041a\u043e\u043d\u0434\u0435\u043d\u0441\u0430\u0446\u0438\u044f \u0432\u043b\u0430\u0433\u0438 \u0432 \u0441\u043c\u0435\u0441\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0439 \u043a\u0430\u043c\u0435\u0440\u0435 \u0432 \u0437\u0438\u043c\u043d\u0438\u0439 \u043f\u0435\u0440\u0438\u043e\u0434!",document.getElementById("Text_DewSM2").innerHTML=a):document.getElementById("TR_IsDewSM2").className="hiddentype"
	//}catch(er){console.log(er)}
}

function PoolActive(){
	//return"f"==Wi.charAt(1)&&"c"==Wi.charAt(2)&&"l"==Wi.charAt(3)&&"r"==Wi.charAt(0)||"\u043c&sup3;"==sM2?1:0
	return 1
}
	
function Read_Vars(){AvTSm=GetNum(objAvTSm,5,35);Press=GetNum(objPress,50,150);TAir=GetNum(objTAir,26,36);var b=MaxVal(1*TAir-9,24),a=MinVal(1*TAir+4,39);TWater=GetNum(objTWater,b,a);HumSm=GetNum(objPVSm,20,98);b=HumContTj(Press,AvTSm,HumSm);PVSm=PressNoSatVapor(Press,b);IsTooHot=5>TAir-AvTSm?1:0;AvTWn=GetNum(objAvTWn,-60,5);Wiw=window;HumOutWn=GetNum(objHumOutWn,0,100);SMount=GetNum(objSMount,0,200);SWater=GetNum(objSWater,2,1E3);InHumSm=GetNum(objInHumSm,40,65);STrack=GetNum(objSTrack,0,1E3);InHumWn=
GetNum(objInHumWn,40,65);NGuest=GetNum(objNGuest,0,200);NSwim_Max=(SWater/5).toFixed(0);b=MinVal((SWater/3).toFixed(0),99);NSwim=GetNum(objNSwim,1,b);b=MaxVal((1.5*SWater).toFixed(0),40);VHall=GetNum(objVHall,b,100*SWater);dB_NW=objIsCover.checked?.7:7;kWAttr=objWAttr.value;1<kWAttr?(objTRAttrExp.className="",b=objAttrExp.value/100,dB_A=IncrWaves(kWAttr)*b):(objAttrExp.options[0].selected=!0,objTRAttrExp.className="hiddentype",dB_A=0);Wi=Wiw.location.hostname}function calc_pool(){}
function Init_Region(){var b;for(Create_SNiP2301_Region();objRegion.options.length;)objRegion.options[0]=null;for(var a=0;a<SNiP2301_Region.length;a++)b=36==a?!0:!1,addOption(objRegion,SNiP2301_Region[a],a,b,b);Init_City()}function check_pl_region(){Init_City()}
function Init_City(){var b;b=objRegion.selectedIndex;if(0<=b){for(;objCity.options.length;)objCity.options[0]=null;for(var a=objRegion.options[1*b].text,c=0;c<SNiP2301_DMain.length;c++)a==SNiP2301_DMain[c][1]&&(b="1"==SNiP2301_DMain[c][3]?!0:!1,addOption(objCity,SNiP2301_DMain[c][2],c,b,b));check_pl_city()}}
function check_pl_city(){var b=objCity.selectedIndex;if(0<=b){var b=objCity.options[1*b].value,a=SNiP2301_DMain[b][4]/10,c=1*SNiP2301_DMain[b][5],d=HumContJ(1*JZone[1*SNiP2301_DMain[b][9]][2],c),e=HumCont100T(a,c),d=RelHumdd(d,e);objPVSm.value=d.toFixed(0);objPress.value=a.toFixed(0);objAvTSm.value=c.toFixed(1);objHumOutWn.value=(1*SNiP2301_DMain[b][8]).toFixed(0);objAvTWn.value=(1*SNiP2301_DMain[b][7]).toFixed(1)}}
function Init_TypePool(){iTypePool=objPlType.selectedIndex;0==iTypePool?(objTextSTrack.style.color=ColorDisable,objSTrack.disabled=1,objSTrack.value="0",objTRSTrack.className="hiddentype",objTRResTrSm.className="hiddentype"):(objTextSTrack.style.color=ColorActive,objSTrack.disabled=0,0==objSTrack.value&&(objSTrack.value=(4.5*Math.sqrt(2*objSWater.value)).toFixed(0)),objTRSTrack.className="",objTRResTrSm.className="");for(var b;objWAttr.options.length;)objWAttr.options[0]=null;if(3==iTypePool)objTextSMount.style.color=
ColorActive,objSMount.disabled=0,objTRSMount.className="",addOption(objWAttr,"\u0412\u043e\u0434. \u0433\u043e\u0440\u043a\u0438 \u0438 \u0434\u0440. \u0430\u0442\u0442\u0440.",0,!0,!0),objWAttr.disabled=1;else{SMount=0;objTRSMount.className="hiddentype";for(var a=0;a<kWave_Arr.length;a++)b=0==a?!0:!1,addOption(objWAttr,kWave_Arr[a][0],kWave_Arr[a][1],b,b);objWAttr.disabled=0}0==iTypePool||3==iTypePool?(objTextNGuest.style.color=ColorDisable,NGuest=0,objNGuest.value="0",objNGuest.disabled=1,objTRNGuest.className=
"hiddentype"):(objNGuest.disabled=0,objTextNGuest.style.color=ColorActive,objTRNGuest.className="")}function check_pl_auto(){Calc_ShowHideAuto();objSelAuto.checked?Init_Region():(objAvTSm.value=26,objPVSm.value=55)}
function Calc_ShowHideAuto(){if(objSelAuto.checked)objRegion.disabled=0,objCity.disabled=0,objPress.disabled=1,objPVSm.disabled=1,objHumOutWn.disabled=1,objAvTSm.disabled=1,objAvTWn.disabled=1,objTextCity.style.color=ColorActive,objTextRegion.style.color=ColorActive;else{for(addOption(objRegion,"\u041e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u043e",1,!0,!0);objCity.options.length;)objCity.options[0]=null;addOption(objCity,"\u041e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u043e",1,!0,!0);objRegion.disabled=
1;objCity.disabled=1;objPress.disabled=0;objPVSm.disabled=0;objHumOutWn.disabled=0;objAvTSm.disabled=0;objAvTWn.disabled=0;objTextCity.style.color=ColorDisable;objTextRegion.style.color=ColorDisable}}function calc_pl_type(){Init_TypePool()}function check_pl_ainpar(){Calc_ShowHideAutoInPar()}
function Calc_ShowHideAutoInPar(){objSelAutoInPar.checked?(objTWater.value="28",objInHumWn.value="45",objInHumSm.value="55",objTAir.value="30",objTWater.disabled=1,objInHumWn.disabled=1,objInHumSm.disabled=1,objTAir.disabled=1):(objTWater.disabled=0,objInHumWn.disabled=0,objInHumSm.disabled=0,objTAir.disabled=0)}
function Init_Var(){objTextCity=document.getElementById("Sel_Text_City");objTextRegion=document.getElementById("Sel_Text_Region");objTextSTrack=document.getElementById("Sel_Text_STrack");objTextSMount=document.getElementById("Sel_Text_SMount");objTextNGuest=document.getElementById("Sel_Text_NGuest");objTextType=document.getElementById("Sel_Text_Type");objTextRTrSm=document.getElementById("Sel_Text_ResTrSm");objTextRTrWn=document.getElementById("Sel_Text_ResTrWn");objSelAuto=document.getElementById("pl_auto");
objSelAutoInPar=document.getElementById("pl_ainpar");objPress=document.getElementById("pl_press");objRegion=document.getElementById("pl_region");objCity=document.getElementById("pl_city");objPVSm=document.getElementById("pl_partvpr_sm");objTextPVSm=document.getElementById("Text_partvpr_sm");objHumOutWn=document.getElementById("pl_humout_wn");objAvTSm=document.getElementById("pl_avt_sm");objTextTSm=document.getElementById("Text_avt_sm");objAvTWn=document.getElementById("pl_avt_wn");objSMount=document.getElementById("pl_smount");
objNGuest=document.getElementById("pl_nguest");objNSwim=document.getElementById("pl_nswim");objWAttr=document.getElementById("pl_wattr");objInHumWn=document.getElementById("pl_inhum_wn");objSTrack=document.getElementById("pl_strack");objInHumSm=document.getElementById("pl_inhum_sm");objSWater=document.getElementById("pl_swt");objTAir=document.getElementById("pl_tair");objPlType=document.getElementById("pl_type");objTWater=document.getElementById("pl_twater");objResHumSm=document.getElementById("pl_reshum_sm");
objVHall=document.getElementById("pl_vhall");objRsH0Sm=document.getElementById("pl_reshum0_sm");objRsH0Wn=document.getElementById("pl_reshum0_wn");objRsH1Sm=document.getElementById("pl_reshum1_sm");objRsH1Wn=document.getElementById("pl_reshum1_wn");objRsHRdSm=document.getElementById("pl_reshumrd_sm");objRsHRdWn=document.getElementById("pl_reshumrd_wn");objRsHAllSm=document.getElementById("pl_reshumall_sm");objRsHAllWn=document.getElementById("pl_reshumall_wn");objRsHNWSm=document.getElementById("pl_reshumnw_sm");
objRsHNWWn=document.getElementById("pl_reshumnw_wn");objRsL0Sm=document.getElementById("pl_resL0_sm");objRsL0Wn=document.getElementById("pl_resL0_wn");objRsL1Sm=document.getElementById("pl_resL1_sm");objRsL1Wn=document.getElementById("pl_resL1_wn");objAHULComm=document.getElementById("pl_ahuLComm");objAHULInf=document.getElementById("pl_ahuLInf");objAHUPwr=document.getElementById("pl_ahuPwr");objAHULComm2=document.getElementById("pl_ahuLComm2");objAHULInf2=document.getElementById("pl_ahuLInf2");objAHUPwr2=
document.getElementById("pl_ahuPwr2");objTextAHULComm=document.getElementById("Sel_Text_ahuLComm");objTextAHULInf=document.getElementById("Sel_Text_ahuLInf");objTextAHUPwr=document.getElementById("Sel_Text_ahuPwr");objTRNGuest=document.getElementById("TR_NGuest");objTRSTrack=document.getElementById("TR_STrack");objTRSMount=document.getElementById("TR_SMount");objTRResTrSm=document.getElementById("TR_ResTrSm");objTRAttrExp=document.getElementById("TR_AttrExp");objTRTooHot1=document.getElementById("TR_TooHot1");
objTRTooHot2=document.getElementById("TR_TooHot2");objIsCover=document.getElementById("pl_cover");objAttrExp=document.getElementById("pl_attrexp");objTextAHUHum=document.getElementById("Sel_Text_ahuHum");objAHUHum=document.getElementById("pl_ahuHum");objHContOutSm=document.getElementById("pl_hcontout_sm");objHContOutWn=document.getElementById("pl_hcontout_wn");objHConInSm=document.getElementById("pl_hcontin_sm");objHContInWn=document.getElementById("pl_hcontin_wn");objRsHAvrSm=document.getElementById("pl_reshumavr_sm");
objRsHAvrWn=document.getElementById("pl_reshumavr_wn");objHComment0=document.getElementById("pl_hcomment0");objHComment1=document.getElementById("pl_hcomment1");objHComment2=document.getElementById("pl_hcomment2")};

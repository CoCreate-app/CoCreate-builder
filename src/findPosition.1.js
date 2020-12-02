function parseCssRules(str) {
  let styleObject = {};
  if (str.split)
    str.split(";").forEach((rule) => {
      let ruleSplit = rule.split(":");
      let key = ruleSplit.shift().trim();
      let value = ruleSplit.join().trim();
      if (key) styleObject[key] = value;
    });

  return styleObject;
}
let html = `
<!DOCTYPE html>
<html test-parent_id="u1NpGDgWIAS4zw4D7Xrw153502" test-page_id="yepVY7ZGxMrArKNXLxYY023200" data-element_id="dPCMdDiOAI143820"><head data-element_id="MWXdRKnRyL143820">
    <meta charset="utf-8" data-element_id="SEGRAGNJrQ143820">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" data-element_id="OHkqdheawz143820">
    <meta name="description" content="Instantly create a start-up or manage and grow an existing business, all-in-one Realtime callobrative solution complete with many automation's and a customizable website." data-element_id="MoEVCGJErc143820">
    <meta name="keywords" content="CoCreate, app landing, responsive" data-element_id="SSJCipGUNX143820">
    <meta name="viewport" content="width=device-width, initial-scale=1" data-element_id="JXPsZpHnMV143820">
    <title data-element_id="NehkXvrmLn143820">CoCreate - Build your business in minutes.</title>
    
    <!-- CoCreate UI -->
    <!--<link rel="stylesheet" href="https://cdn.cocreate.app/CoCreate.min.css" type="text/css" />-->
    <link rel="stylesheet" href="https://server.cocreate.app/css/CoCreate.min.css" type="text/css" data-element_id="dglweFaWdH143820">
    <!--<link rel="stylesheet" href="https://server.cocreate.app/CoCreate-components/CoCreate-overlay-scroll/CoCreate-overlay-scroll.css" type="text/css" />-->
   
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" crossorigin="anonymous" data-element_id="EOzLmhucvN143820">    
   
    <!-- Animate CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" data-element_id="jSsQxVCDQC143820">
  <style data-element_id="uvKEcMdcYR143820">
  .overlay-scroll {
    overflow: overlay!important; 
    position: relative;
    overflow-anchor: none;
    -ms-overflow-style: none;
    touch-action: auto;
    -ms-touch-action: auto;
  }
  
  ::-webkit-scrollbar {
    width: 5px;
    height:5px;
  }
  ::-webkit-scrollbar-thumb:hover {
      background: #3790ff!important;
  }
  ::-webkit-scrollbar-thumb{
    background: rgba(0, 0, 0, 0.08)!important;
  }
  ::-webkit-scrollbar-track{
    background: rgba(0, 0, 0, 0.06)!important;
  }

</style><style component="CoCreateCss" data-element_id="qICJLeftTU143820"></style><style id="dnd-style">    /* dnd specic */
      [data-draggable="true"], [data-cloneable="true"]  {
        touch-action: none;
      }
      /* dnd specic */</style></head>

  
  <body data-element_id="CIlOSCQQGG143820">
    <!-- Navbar  -->
    <div class="display:flex flex-wrap:wrap justify-content:space-between flex-direction:row padding-top:10px padding-bottom:10px width:100% nav" data-main_content_id="content" data-scroll=", sticky-nav" data-scroll_up="15" data-scroll_down="5" data-element_id="FgrHBXALxk143820">

      <!--<a href="#" class="logo">Navbar</a>-->
      <div class="margin:0px_15px display:flex flex-wrap:wrap justify-content:space-between flex-direction:row align-items:center width:100%" data-element_id="FCDjGpPziK143820">
        <div class="logo-box" data-element_id="RhPZTalsVF143820">
          <a href="/" data-element_id="DcsynIBaxu143820">
            <img src="images/logo.png" data-element_id="xvypeHHDYJ143820">
          </a>
        </div>
         
          <a class="nav-toggle menu_icon show-on-phone-only" data-toggle_sidenav="menuL" data-element_id="mtrsOHSFbY143820">
              <span data-element_id="IprEThRNzs143820"></span>
              <span data-element_id="wSnCHAVBVV143820"></span>
              <span data-element_id="jBkrXceoHj143820"></span>
          </a>
  
        <div class="display:flex align-items:center show-on-tablet-and-up" data-element_id="ThlLJEMhYa143820">
          <div class="" data-element_id="yWibbJRafX143820">
            <a href="" data-element_id="IzzrCSUwyS143820">Home</a>
          </div>
          <div class="margin-left:25px" data-element_id="hcbCzFKRgp143820">
            <a href="" data-element_id="vhxVjbbmpi143820">Features</a>
          </div>
          <div class="margin-left:25px" data-element_id="vALcCUvxMw143820">
            <a href="https://server.cocreate.app/documentation/" data-element_id="ylHJkopCoL143820">Documentation</a>
          </div>
          <div class="margin-left:25px" data-element_id="SfsmeaSLuY143820">
            <a href="" data-element_id="yXQTLHiFLr143820">Pricing</a>
          </div>
          <div class="margin-left:25px" data-element_id="pxYfiFofka143820">
            <a href="#spreadtheword" data-element_id="FbEwjkxCxJ143820">Spread the word</a>
          </div>
          <div class="margin-left:25px" data-element_id="MZvvEdCbXt143820">
            <a class="border:1px_black_solid border-radius:50px padding:10px" href="" data-element_id="bVCdqmQAvo143820">Get Started <i class="fas fa-chevron-right" data-element_id="hYLqtUQzPT143820"></i></a>
          </div>
        </div>
      </div>
    </div>
    
    <!---------------------------------------------- HEADER HERO SECTION ------------------------------------------->
    
    <section class="padding-top:80px padding-bottom:40px   " data-element_id="xKwpkpcpBj143820">
      <div class=" max-width:90% margin:0px_auto" data-element_id="CIIoSpdoPK143820">
        <div class="display:flex flex-wrap:wrap align-items:center flex-direction:row-reverse" data-element_id="txFWdGJlWA143820">
          <div class="flex-grow:1 min-width:300px width:50%" data-element_id="EvACHcSNwX143820">
            <video loop="" autoplay="" muted="" class="width:100%" data-element_id="bbGpTDTDEB143820">
              <source src="images/dashboard-video.mp4" type="video/mp4" data-element_id="yFnHFbjZzU143820">
            </video>
          </div>
          <div class="flex-grow:1 min-width:300px width:50% padding:0px_15px font-size:16px " data-element_id="RPFEiVoIUD143820">
            <h1 class="font-size:2rem" data-element_id="gZbOaEobKu143820">Build your buisness in <span class="color:dodgerblue" data-element_id="oxSPyeHHGJ143820">minutes</span></h1>
            <p class="margin-top:10px" data-element_id="ArhjJmToJm143820">Collaborate. Track. Sell. Manage with ease.</p>
            <button class="display:inline-block background-color:dodgerblue color:white border-radius-50px margin-top:20px padding:10px_0px padding:0px_30px" data-element_id="PmhlBVHsFj143820">Get Started</button>
          </div>
        </div>
      </div>
    </section>

    <!---------------------------------------------- COMPANY SECTION ------------------------------------------->
    
    <section class="background:whitesmoke padding:25px_0px" data-element_id="QnZZeOysxX143820">
      <div class="max-width:90% margin:0px_auto" data-element_id="tKKAgzsfYV143820">
        <div class="padding:25px_0px display:flex flex-wrap:wrap justify-content:space-between flex-direction:row align-items:center" data-element_id="YpHWBnwLxh143820">
          <div class="padding:0px_10px" data-element_id="ylUXoXQQVT143820">
            <img src="images/client-01.png" class="max-height:60px width:auto" data-element_id="xKztLqGNXX143820">
          </div>
          <div class="padding:0px_10px" data-element_id="thuSmxrXIk143820">
            <img src="images/client-02.png" class="max-height:60px width:auto" data-element_id="bkzabygqHZ143820">
          </div>
          <div class="padding:0px_10px" data-element_id="gMshHPIXxW143820">
            <img src="images/client-03.png" class="max-height:60px width:auto" data-element_id="fOFErghjWa143820">
          </div>
          <div class="padding:0px_10px" data-element_id="rtFWxIkWWB143820">
            <img src="images/client-04.png" class="max-height:60px width:auto" data-element_id="CLhNYsudHB143820">
          </div>
          <div class="padding:0px_10px" data-element_id="uctsKFXflq143820">
            <img src="images/client-05.png" class="max-height:60px width:auto" data-element_id="hhzeYxwUAO143820">
          </div>
          <div class="padding:0px_10px" data-element_id="OnizCQdoEm143820">
            <img src="images/client-06.png" class="max-height:60px width:auto" data-element_id="vSaSbKFGHp143820">
          </div>
          <div class="padding:0px_10px" data-element_id="ICwfjUctuq143820">
            <img src="images/client-07.png" class="max-height:60px width:auto" data-element_id="OAdgfLUNTU143820">
          </div>
        </div>
      </div>
    </section>
    
    <!---------------------------------------------- BUSINESS STEPS SECTION ------------------------------------------->
        <!------------------------------------ FIRST STEPS SECTION --------------------------------->
    <section class="padding-top:80px padding-bottom:40px" data-element_id="bQTQWUrbkF143820">
      <div class="max-width:90% margin:0px_auto" data-element_id="RhlJOIObCX143820">
        <div class="display:flex flex-wrap:wrap align-items:center" data-element_id="KRCmXfkiWE143820">
          <div class="flex-grow:1 min-width:300px width:50%" data-element_id="PEoSJCgkfp143820">
            <video loop="" autoplay="" muted="" class="width:100%" data-element_id="vrUwLGGsYM143820">
              <source type="video/mp4" src="images/on-board-video.webm" data-element_id="OZnvcYRSmP143820">
            </video>
          </div>
          <div class="flex-grow:1 min-width:300px width:50% padding-left:15px padding-right:15px" data-element_id="fEOMLcayBy143820">
            <h1 class="font-size:1.5rem text-transform:uppercase" data-element_id="tTkurPpuJn143820">Sign up &amp; choose your industry</h1>
            <p class="margin-top:10px" data-element_id="ZSVhfkZodl143820">We will CoCreate a website to your specific industry and needs.
</p>
            <p data-element_id="tbqnQJNrWY143820"></p>
            <a class="text-decoration-underline padding:10px_30px background:#3690FF background:#3790FF:hover min-width:30% text-align:center color:#fff color:#ddd:hover transition:0.4s margin-top:30px display:inline-block" data-element_id="hSlnbqISBZ143820">Sign Up Now</a>
          </div>
        </div>
      </div>
    </section>
        <!------------------------------------ SECOND STEPS SECTION --------------------------------->
    <section class="background:whitesmoke padding-top:80px padding-bottom:40px" data-element_id="ubUIINqYsz143820">
      <div class="max-width:90% margin:0px_auto" data-element_id="wdqMjxREom143820">
        <div class="display:flex flex-wrap:wrap align-items:center flex-direction:row-reverse" data-element_id="FRAIHllPjK143820">
          <div class="flex-grow:1 min-width:300px width:50%" data-element_id="TJqbhExcIO143820">
            <video loop="" autoplay="" muted="" class="width:100%" data-element_id="qQJhePpHrR143820">
              <source type="video/mp4" src="images/cards.webm" data-element_id="IbuIILwWqz143820">
            </video>
          </div>
          <div class="flex-grow:1 min-width:300px width:50% padding-left:15px padding-right:15px" data-element_id="cPJfgECefd143820">
            <h1 class="font-size:1.5rem text-transform:uppercase" data-element_id="AAJqjNboLE143820">Follow the business development checklist</h1>
            <p class="margin-top:10px" data-element_id="UpWhkmMdJw143820">We will walk you through the process, improve the image of your business. A professional look can bring organic traffic</p>
            <a class="text-decoration-underline padding:10px_30px background:#3690FF background:#3790FF:hover min-width:30% text-align:center color:#fff color:#ddd:hover transition:0.4s margin-top:30px display:inline-block" data-element_id="TqBNZSBcMl143820">See more features</a>
          </div>
        </div>
      </div>
    </section>
    <!------------------------------------ THIRD STEPS SECTION --------------------------------->
    <section class="padding-top:80px padding-bottom:40px" data-element_id="EPbDoLRtuV143820">
      <div class="max-width:90% margin:0px_auto" data-element_id="isaBIqBtxt143820">
        <div class="display:flex flex-wrap:wrap align-items:center" data-element_id="nXbwNjMHiw143820">
          <div class="flex-grow:1 min-width:300px width:50%" data-element_id="TvZqfdnwDl143820">
            <video loop="" autoplay="" muted="" class="width:100%" data-element_id="loGIWJdxKN143820">
              <source type="video/mp4" src="images/on-board-video.webm" data-element_id="PtvHqVPqjO143820">
            </video>
          </div>
          <div class="flex-grow:1 min-width:300px width:50% padding-left:15px padding-right:15px" data-element_id="hxcmAQXukc143820">
            <h1 class="font-size:1.5rem text-transform:uppercase" data-element_id="QZSdmKcXFQ143820">Find the perfect domain for your new website</h1>
            <p class="margin-top:10px" data-element_id="PgGhoDtVIw143820">Domain represent your brand. Our sole purpose is to improve your domains visibility on search engines and get visitors.</p>
            <p data-element_id="bpbjklXVHe143820"></p>
            <a class="text-decoration-underline padding:10px_30px background:#3690FF background:#3790FF:hover min-width:30% text-align:center color:#fff color:#ddd:hover transition:0.4s margin-top:30px display:inline-block" data-element_id="BARcbidoBI143820">See more features</a>
          </div>
        </div>
      </div>
    </section>
        <!------------------------------------ FOURTH STEPS SECTION --------------------------------->
    <section class="background:whitesmoke padding-top:80px padding-bottom:40px" data-element_id="IlStyNXzSA143820">
      <div class="max-width:90% margin:0px_auto" data-element_id="FoJQMApxSj143820">
        <div class="display:flex flex-wrap:wrap align-items:center flex-direction:row-reverse" data-element_id="yaKBWGbVaf143820">
          <div class="flex-grow:1 min-width:300px width:50%" data-element_id="tiCKpVQNTO143820">
            <video loop="" autoplay="" muted="" class="width:100%" data-element_id="jKpZYVDcqk143820">
              <source type="video/mp4" src="images/cards.webm" data-element_id="hkhiRSSAKt143820">
            </video>
          </div>
          <div class="flex-grow:1 min-width:300px width:50% padding-left:15px padding-right:15px" data-element_id="mPoWgIVjuv143820">
            <h1 class="font-size:1.5rem text-transform:uppercase" data-element_id="WoYbmCClIO143820">Get a dedicated phone number</h1>
            <p class="margin-top:10px" data-element_id="kdfFnAwCgP143820">Includes ivr menu so you can route your customers and provide some marketing of your services.</p>
            <a class="text-decoration-underline padding:10px_30px background:#3690FF background:#3790FF:hover min-width:30% text-align:center color:#fff color:#ddd:hover transition:0.4s margin-top:30px display:inline-block" data-element_id="aZTfpZbOHs143820">See more features</a>
          </div>
        </div>
      </div>
    </section>
    <!------------------------------------ FIFTH STEPS SECTION --------------------------------->
    <section class="padding-top:80px padding-bottom:40px" data-element_id="SCJesKwhIP143820">
      <div class="max-width:90% margin:0px_auto" data-element_id="fYpdYXBBiz143820">
        <div class="display:flex flex-wrap:wrap align-items:center" data-element_id="JjUkglOCQx143820">
          <div class="flex-grow:1 min-width:300px width:50%" data-element_id="TntSYzSqqa143820">
            <video loop="" autoplay="" muted="" class="width:100%" data-element_id="PCLjNhIjsC143820">
              <source type="video/mp4" src="images/on-board-video.webm" data-element_id="sRTATXKHqN143820">
            </video>
          </div>
          <div class="flex-grow:1 min-width:300px width:50% padding-left:15px padding-right:15px" data-element_id="YDhyRgxuUQ143820">
            <h1 class="font-size:1.5rem text-transform:uppercase" data-element_id="CipLJzLPnP143820">Improve your website content</h1>
            <p class="margin-top:10px" data-element_id="agMQPgcgnY143820">Provide a personal touch to your website. Everything is 100% customizable. We already provided SEO friendly content as inspiration. Search engine's love fresh and unique content. Adding your own personal touch will achieve that goal.</p>
            <p data-element_id="qAeGjEjGME143820"></p>
            <a class="text-decoration-underline padding:10px_30px background:#3690FF background:#3790FF:hover min-width:30% text-align:center color:#fff color:#ddd:hover transition:0.4s margin-top:30px display:inline-block" data-element_id="HISDVzULne143820">See more features</a>
          </div>
        </div>
      </div>
    </section>
        <!------------------------------------ SIXTH STEPS SECTION --------------------------------->
    <section class="background:whitesmoke padding-top:80px padding-bottom:40px" data-element_id="LzkhYjrxST143820">
      <div class="max-width:90% margin:0px_auto" data-element_id="vcDhXhAYED143820">
        <div class="display:flex flex-wrap:wrap align-items:center flex-direction:row-reverse" data-element_id="rgyXPNiFUj143820">
          <div class="flex-grow:1 min-width:300px width:50%" data-element_id="hYdlEDbKfe143820">
            <video loop="" autoplay="" muted="" class="width:100%" data-element_id="JfSAXUXlPi143820">
              <source type="video/mp4" src="images/cards.webm" data-element_id="VVyFSglkyu143820">
            </video>
          </div>
          <div class="flex-grow:1 min-width:300px width:50% padding-left:15px padding-right:15px" data-element_id="rfALqETRlY143820">
            <h1 class="font-size:1.5rem text-transform:uppercase" data-element_id="ImzmsPmcwf143820">Start marketing your business</h1>
            <p class="margin-top:10px" data-element_id="NhLsXIJjlY143820">
              We will guide you through :
              </p><ul class="margin:5px_0_5px_30px line-height:26px" data-element_id="fUUSdLUsED143820">
                <li data-element_id="iMYxJzqbRQ143820">Maintaining at least 1 blogpost a week will go a long way to driving your websites, keywords and search term rankings.</li>
                <li data-element_id="gMONqVCHGb143820">3 social media post a week to promote and market your blogposts and website content.</li>
                <!--<li>Sharing other content and comment.</li>-->
              </ul>
            <p data-element_id="NelTHEMCcA143820"></p>
            <a class="text-decoration-underline padding:10px_30px background:#3690FF background:#3790FF:hover min-width:30% text-align:center color:#fff color:#ddd:hover transition:0.4s margin-top:30px display:inline-block" data-element_id="DgQaqOjtWa143820">See more features</a>
          </div>
        </div>
      </div>
    </section>
    <!------------------------------------ SEVENTH STEPS SECTION --------------------------------->
    <section class="padding-top:80px padding-bottom:40px" data-element_id="BUzFFemoqr143820">
      <div class="max-width:90% margin:0px_auto" data-element_id="gBVspNCRTY143820">
        <div class="display:flex flex-wrap:wrap align-items:center" data-element_id="udijuMITmE143820">
          <div class="flex-grow:1 min-width:300px width:50%" data-element_id="ZVSQpgbWhN143820">
            <video loop="" autoplay="" muted="" class="width:100%" data-element_id="DfkFFpFimu143820">
              <source type="video/mp4" src="images/on-board-video.webm" data-element_id="XIYRTaAAAl143820">
            </video>
          </div>
          <div class="flex-grow:1 min-width:300px width:50% padding-left:15px padding-right:15px" data-element_id="dOHUCfIYVh143820">
            <h1 class="font-size:1.5rem text-transform:uppercase" data-element_id="QrBbhWIfJw143820">Introducing milestones</h1>
            <p class="margin-top:10px" data-element_id="JvYwErhBIT143820">We add new milestones so you can continue to improve and grow. Business is a long game and requires patience. You need to nurture it to maturity. It can take months to start receiving organic traffic. But it will feel great when you recieving traffic, Similaly when people walking in to your shop and requesting your service or product.</p>
            <p data-element_id="ZarEnonKwF143820"></p>
            <a class="text-decoration-underline padding:10px_30px background:#3690FF background:#3790FF:hover min-width:30% text-align:center color:#fff color:#ddd:hover transition:0.4s margin-top:30px display:inline-block" data-element_id="InPtczmxiG143820">See more features</a>
          </div>
        </div>
      </div>
    </section>
    
    <!---------------------------------------------- FOOTER SECTION ------------------------------------------->
    
    <footer id="spreadtheword" class="padding:100px_0px background-size:cover background-position:center position:relative color:white" style="background-image:url(images/banner.png)" data-element_id="NjdPWDvCMz143820">
      <div class="position:relative max-width:90% margin:0px_auto" data-element_id="MGYdRrbgSQ143820">
        <h1 class="text-align:center padding-bottom:20px" data-element_id="unjbKDEujS143820">SPREAD THE WORD!</h1>
    					
    					<div class="width:100% display:inline-block text-align:center padding-bottom:20px font-size:21px border-bottom:1px_solid_white" data-element_id="DswWFojOzf143820">
    						<ul class="padding-0px list-style-type:none justify-content:center display:flex" data-element_id="XTkNGBplwb143820">
    							<li class="padding:0px_15px" data-element_id="eqOzhiVFwK143820"><a href="#" class="color:white" data-network="facebook" title="Share on Facebook" data-element_id="tvOsaBcfVA143820"><i class="fab fa-facebook-f" data-element_id="JdMFeFgdLl143820"></i></a></li>
    							<li class="padding:0px_15px" data-element_id="kdUSVlfrmF143820"><a href="#" class="color:white" data-network="twitter" data-element_id="eFebkvIQRb143820"><i class="fab fa-twitter" data-element_id="vSFXAGKdFj143820"></i></a></li>
    							<li class="padding:0px_15px" data-element_id="fOPMORLgEC143820"><a href="#" class="color:white" data-network="google" data-element_id="PLDfipXVpU143820"><i class="fab fa-google-plus-g color:white" data-element_id="JZmmVwahGb143820"></i></a></li>
    							<li class="padding:0px_15px" data-element_id="kajqvfArjE143820"><a href="#" class="color:white" data-network="linkedin" data-element_id="qgsCEhsKnE143820"><i class="fab fa-linkedin-in" data-element_id="pqbvJbDCEC143820"></i></a></li>
    							<li class="padding:0px_15px" data-element_id="nByLJsZiAs143820"><a href="#" class="color:white" data-network="pintrest" data-element_id="wYKNDFnZuS143820"><i class="fab fa-pinterest-p" data-element_id="GaYugODeYS143820"></i></a></li>
    						</ul>
    					</div>				
    
        <p class="text-align:center padding-top:20px" data-element_id="JfZkuLJPRH143820">2015 - 2020 All Right Reserved</p>
        <p class="text-align:center" data-element_id="ETEcGZGEBu143820"><a class="color:white" href="#" data-element_id="GcLZkKLgYY143820">CoCreate LLC</a></p>
      </div>
    </footer>
    
    <div id="menuL" class="cocreate-sidenav background:whitesmoke" data-main_content="canvas,navbar" sidenav-default_desktop="offcanvas" sidenav-default_tablet="offcanvas" sidenav-default_phone="offcanvas" sidenav-expanded_width="300px" style="width: 0px;" data-element_id="slttNUuvXT143820">
      <ul class="cocreate-scroll" data-element_id="PxfAZecVTi143820">
        <div class="background:#3690FF:hover transition:0.3s padding:10px_0 margin-bottom:10px " data-element_id="WgRcfzTGRE143820">
          <a class="margin-left:25px color:#fff:hover" href="#" data-element_id="tkaEFWFKeQ143820">Home</a>
        </div>
        <div class=" background:#3690FF:hover transition:0.3s padding:10px_0 margin-bottom:10px " data-element_id="awPNuOxFxC143820">
          <a class="margin-left:25px color:#fff:hover" href="#" data-element_id="jHhxVKgTNM143820">Features</a>
        </div>
        <div class=" background:#3690FF:hover transition:0.3s padding:10px_0 margin-bottom:10px " data-element_id="JhppExLpka143820">
          <a class="margin-left:25px color:#fff:hover" href="#" data-element_id="BIngoNSZPs143820">Demo</a>
        </div>
        <div class=" background:#3690FF:hover transition:0.3s padding:10px_0 margin-bottom:10px " data-element_id="WwHIKwUhkp143820">
          <a class="margin-left:25px color:#fff:hover" href="#" data-element_id="ULymVNWhcW143820">Pricing</a>
        </div>
        <div class=" background:#3690FF:hover transition:0.3s padding:10px_0 margin-bottom:10px " data-element_id="ZAkEncOmcz143820">
          <a class="margin-left:25px color:#fff:hover" href="#" data-element_id="wreasxXlYb143820">Spread the word</a>
        </div>
      	  <div class="resizeHandler" data-element_id="bHthsMcsSC143820"></div>
  	  </ul>
    </div>

    <script data-element_id="oAbfSfzsFg143820">
      var config = {
        apiKey: 'c2b08663-06e3-440c-ef6f-13978b42883a',
        securityKey: 'f26baf68-e3a9-45fc-effe-502e47116265',
        organization_Id: '5de0387b12e200ea63204d6c'
      }
    </script>


  <!--CoCreateJS-->
  <script src="https://server.cocreate.app/js/CoCreate.min.js" data-element_id="KSGgDgkbKu143820"></script>
  <!--<script src="https://server.cocreate.app/CoCreate-components/CoCreate-overlay-scroll/CoCreate-overlay-scroll.js"></script>-->

  


</body></html>

`;

// let findpos = new getStringPosition({
//   html, // html String
//   tagName: "ul",
//   target: "BTDyibkoTt150457",
//   method: "setAttribute",
//   //  property: "data-element_id",
//   property: "rand", 
// });


// let findpos = new getStringPosition({
//   html, // html String
//   tagName: "ul",
//   target: "BTDyibkoTt150457",
//   method: "setAttribute",
//   //  property: "data-element_id",
//   property: "data-element-ddddd",
// });
// new getStringPosition({
//   html, // html String
//   tagName: "ul",
//   target: "BTDyibkoTt150457",
//   method: "style.set",
//   property: "background",
// });
// new getStringPosition({
//   html, // html String
//   tagName: "ul",
//   target: "BTDyibkoTt150457",
//   method: "style.set",
//   property: "padding",
// });

// new getStringPosition({
//   html, // html String
//   tagName: "div",
//   target: "DXKWxRSIua150457",
//   method: "style.set",
//   property: "padding",
// });

// new getStringPosition({
//   html, // html String
//   tagName: "ul",
//   target: "BTDyibkoTt150457",
//   method: "class.set",
//   property: "my-class-name",
// });

// new getStringPosition({
//   html, // html String                                                                     
//   tagName: "ul",
//   target: "BTDyibkoTt150457",
//   nextTarget: "fff",
//   skip: 1,
//   method: "insertAdjacentElement",
//   property: "beforeend",
// });


// new getStringPosition({
//   html, // html String
//   tagName: "a",
//   target: "gggg",
//   method: "setAttribute",

// });


new getStringPosition({
  html, // html String
   tagName: "ul",
  target: "BTDyibkoTt150457",
  nextTarget: "fff",
  skip: 1,
  method: "removeElement",
  
});


// let unconditinalTag = ["br"];
function getStringPosition({
  html,
  tagName: realTagName,
  target,
  method,
  property,
  nextTarget,
  skip,
}) {

  // regex
  this.getRegAttribute = (attributeName) =>
    `(?:${sps}${attributeName}="[^"]*?"${sps})`;
  this.getRegStyle = (styleName) =>
    `(?:${sps}${styleName}${sps}\:${sps}[^\;]+?${sps};${sps})`;
  this.getRegClass = (className) => `(?:${sps}${className}${sps})`;
  this.getTagClose = (tagName) => `(?:${sps}\/${sps}${tagName}${sps})`;
  this.getRegTagStart = (tagName) => `(?:<${tagName}${sps})`;
  // &todo: wrong * make it +, done, is it correct?
  let allAttributeName = "[a-z0-9-_]+?";
  let allStyleName = "[a-z0-9-]+?";
  let allClassName = allStyleName;
  let sps = " *?";

  let at = this.getRegAttribute(allAttributeName);
  let mat = `(?:${at}*?)`;
  let mat2 = `(?:${sps}${at}*?${sps})`;
  let tgs = `(?:<(?<tagName>[a-z]+?)${sps})`;

  let sch = `(?:${sps}data-element_id\=\"${target}\"${sps})`;

  // todo: check with a tag like <a />
  let the = `(?<tagSlash>\/)?>`;

  let closingTag = `<${sps}/${realTagName}>`;

  let sty = this.getRegStyle(allStyleName);
  let msty = `${sty}*?`;

  let cls = this.getRegClass(allClassName);
  let mcls = `${cls}*?`;

  let revTag = realTagName.split("").reverse().join("");
  let backCloseTag = `(?<closeTag>>${revTag}${sps}\/${sps}<)`;
  
  // metadata
  this.tagStPos;
  this.tagStAfPos;
  this.tagStClPos;
  this.tagStClAfPos;
  this.tagEnPos;
  this.tagEnClPos;
  this.atSt;
  this.atEn;

  this.tagEnPos;
  this.tagEnClAfPos;

  this.lastStart;
  this.offset;


  // this.findClosingTag = () => {
  //   let reverseHtml = html.split("").reverse().join("");
  //   let start;
  //   if (nextTarget) {
  //     start = reverseHtml.indexOf(nextTarget.split("").reverse().join(""));
  //     reverseHtml = reverseHtml.substr(start);
  //   }
  //   let a = 0,
  //     found = {groups:{closeTag:''}};
  //   do {
  //     reverseHtml = reverseHtml.substr(a + found.groups.closeTag.length);
  //     found = reverseHtml.match(new RegExp(backCloseTag, "is"));

  //     a += found ? found.index + found[0].length: 0;
  //   } while (found && skip--);
  //   a += found ?  found[0].length: 0;
  //   return {from: html.length - a - start, to: html.length - a - start + found.groups.closeTag.length};
  // };
  this.getWholeElement = ()=>{
    if (!this.tagStPos) this.findStartTag(html);
    if (!this.tagEnPos) this.findClosingTag();
    

    return {from: this.tagStPos, to:this.tagEnClAfPos};
  }
  this.findClosingTag = () => {
    let reverseHtml = html.split("").reverse().join("");
    let start;
    if (nextTarget) {
      start = reverseHtml.indexOf(nextTarget.split("").reverse().join(""));
      reverseHtml = reverseHtml.substr(start);
    }

    let found = reverseHtml.matchAll(new RegExp(backCloseTag, "isg"));

    let match = Array.from(found)[skip];
    if(!match) throw new Error( "couldn't find the end tag");
    this.tagEnPos = html.length - match.index - start - match[0].length;
    this.tagEnClAfPos = this.tagEnPos + match[0].length;

  };



  this.findStartTag = (html) => {
    let tagStart = html.match(
      new RegExp(`(?<tagWhole>${tgs}${mat}${sch}${mat}${the})`, "is")
    );
    // console.log(tagStart, tagStart.groups); return;
    if (!tagStart) throw new Error("findPosition: element can not be found");

    if (tagStart && tagStart.groups.tagName !== realTagName)
      throw new Error(
        "findPosition: tag name didn't match, something is wrong"
      );
    this.tagName = tagStart.groups.tagName;
    this.tagStPos = tagStart.index;
    this.tagStAfPos = tagStart.index + realTagName.length + 1;
    this.tagStClPos = tagStart.index + tagStart.groups.tagWhole.length - 1 - (tagStart.groups.tagSlash ? 1 : 0);
    this.tagStClAfPos = tagStart.index + tagStart.groups.tagWhole.length;
  };
  this.getInsertAdjacentElement = (property) => {
    if (!this.tagStPos) this.findStartTag(html);
    switch (property) {
      case "beforebegin":
        return { from: this.tagStPos };
        break;
      case "afterbegin":
        return { from: this.tagStClAfPos };
        break;
      case "beforeend":  
        this.findClosingTag();
        return {from: this.tagEnPos};
        break;
      case "afterend":
        this.findClosingTag();
        return {from: this.tagEnClAfPos};
        break;
    }

    html.substr(this.tagStClAfPos);
  };



  this.getClass = (property, method2) => {
    this.findAttribute(html, "class", true);
    if (this.atEn) {
      let positions = this.findClassPos(html, property);
      return { ...positions, context: "value" };
    }
    // for set or remove
    else return { from: this.atSt, context: "attribute" };
  };
  this.findClassPos = (html, property) => {
    let prRegClass = this.getRegClass(property);
    // console.log(prRegStyle);return;
    let classStart = html
      .substring(this.atSt, this.atEn)
      .match(
        new RegExp(`^(?<styleWhole>${mcls})(?<ourStyle>${prRegClass})`, "is")
      );

    if (classStart && classStart.groups.ourStyle)
      return {
        from: this.atSt + classStart.groups.styleWhole.length,
        to:
          this.atSt +
          classStart.groups.styleWhole.length +
          classStart.groups.ourStyle.length,
      };
    else
      return {
        from: this.atEn,
      };
  };
  this.getStyle = (property, method2) => {
    this.findAttribute(html, "style", true);
    if (this.atEn) {
      let positions = this.findStylePos(html, property);
      return { ...positions, context: "value" };
    }
    // for set or remove
    else return { from: this.atSt, context: "attribute" };
  };
  this.findStylePos = (html, property) => {
    let prRegStyle = this.getRegStyle(property);
    // console.log(prRegStyle);return;
    let styleStart = html
      .substring(this.atSt, this.atEn)
      .match(
        new RegExp(`^(?<styleWhole>${msty})(?<ourStyle>${prRegStyle})`, "is")
      );

    if (styleStart && styleStart.groups.ourStyle)
      return {
        from: this.atSt + styleStart.groups.styleWhole.length,
        to:
          this.atSt +
          styleStart.groups.styleWhole.length +
          styleStart.groups.ourStyle.length,
      };
    else
      return {
        from: this.atEn,
      };
  };
    // this.findNextTag = (html) => {
  //   let tagStart = html.match(
  //     new RegExp(
  //       `(?<tagWhole>${this.getRegTagStart(realTagName)}${mat}${the})`,
  //       "is"
  //     )
  //   );
  //   if (!tagStart) return;
  //   // console.log(tagStart, tagStart.groups); return;
  //   this.tagName = tagStart.groups.tagName;
  //   this.tagStPos = tagStart.index;
  //   this.tagStAfPos = tagStart.index + realTagName.length + 1;
  //   this.tagStClPos = tagStart.index + tagStart.groups.tagWhole.length - 1;
  //   this.tagStClAfPos = tagStart.index + tagStart.groups.tagWhole.length;
  // };
  
  //   this.findTagEnd = () => {
  //   // todo: lastStart must get updated

  //   do {
  //     // only find the real tag name
  //     this.findNextTag(html.substr(this.offset));
  //     if (this.tagStClAfPos) {
  //       this.offset += this.tagStClAfPos;
  //       this.lastStart += this.tagStClAfPos;
  //       this.findTagEnd();
  //     }
  //   } while (this.lastStart !== this.tagStClAfPos);

  //   let prCloseTag = this.getTagClose(this.tagName);
  //   let html3 = html.substr(this.tagStClAfPos);

  //   let tagEnd = html3.match(new RegExp(`(?<closingTag>${prCloseTag})`, "is"));

  //   return tagEnd.index;
  // };
  this.findAttribute = (html, property, isValueOnly) => {
    if (!this.tagStAfPos) this.findStartTag(html);

    let prRegAttr = this.getRegAttribute(property);
    let regex = `^(?<beforeAtt>${mat})${prRegAttr}`;

    let attStart = html.substr(this.tagStAfPos).match(new RegExp(regex, "is"));

    if (attStart) {
      this.atSt =
        this.tagStAfPos +
        attStart.groups.beforeAtt.length +
        (isValueOnly ? 3 + property.length : 0);

      let tagEnd = html
        .substr(this.atSt)
        .match(new RegExp('(?<attEnd>^[^"]*?")', "is"));
      this.atEn =
        this.atSt + tagEnd.groups.attEnd.length - (isValueOnly ? 1 : 0);
    } else {
      this.atSt = this.tagStClPos;
    }
  };

  this.getSetAttribute = (property, type) => {
    switch (type) {
      case "get":
      case "set":
        this.findAttribute(html, property, true);
        break;
      case "remove":
        this.findAttribute(html, property);
        break;
    }
    return { from: this.atSt, to: this.atEn };
  };




  this.scanMethods = () => {
    let [method1, method2] = method.split(".");
    switch (method1) {
      case "insertAdjacentElement":
        return this.getInsertAdjacentElement(property);
        break;
      case "class":
        return this.getClass(property, method2);
        break;
      case "style":
        return this.getStyle(property, method2);
        break;
      case "setAttribute":
        return this.getSetAttribute(property, "set");
        break;
      case "getAttribute":
        return this.getSetAttribute(property, "get");
        break;
      case "removeAttribute":
        return this.getSetAttribute(property, "remove");
        break;
      case "removeElement":
        return this.getWholeElement();
        break;
    }
  };

  let p = this.scanMethods();
  console.log(p);
  if (p.to) {
    console.log("from and to>>>>>>>>>>>>>>>>>>>>>>>>");

    console.log(
      html.substring(p.from - 20, p.from) +
        "<from>" +
        html.substring(p.from, p.to) +
        "<to>" +
        html.substring(p.to, p.to + 20)
    );
  } else {
    console.log("only from>>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log(html.substring(p.from, p.from + 20));
    console.log(
      html.substring(p.from - 20, p.from) +
        "<here>" +
        html.substring(p.from, p.from + 40)
    );
  }
}

// let sp = new stringPosition({
//     html,
//     tagName: 'ul',
//     target: 'BTDyibkoTt150457',
//     method: 'insertAdjacentElement',// setAttribute | insertAdjacentElement | class | style
//     property: 'beforeEnd',
// })
// console.log(sp)

// const found = html.match(new RegExp(`${tgs}${mat}${sch}${mat}${the}`, 'is'))
// console.log(found, html.substring(found.index,found.index+20));
// let tagName = found[2];

// let stringStart = found.index + found[0].length;
// console.log(tagName)

// let startCloseTag = `${tgs}${mat}${sch}${mat}${the}`
// const found2 = html
// .substr(stringStart)
// .match(new RegExp(`.*?${closingTag}`, 'is'))

// console.log(found2)

// output: 'position between 2 tags'

// 	domEditor({
// 							target: 'object',
// 							selector_type: 'querySelectorAll',
// 							selector: '*',
// 							method: 'setAttribute',
// 							index : null,
// 							property : null,
// 							value : '{'first_attr':'cvalue','second_attr':'value'}',
// 			});

// to get document from db will return json object. we need fieldname: newtest
/*
  CoCreate.readDocument({
    collection: "module_activities",
    document_id: "5edda7608d5c7a7d656edecd",
  }),
  */

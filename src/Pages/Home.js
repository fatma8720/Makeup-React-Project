import img from '../assest/img/brushes-6d2ab84631ecd47ced4fa07c47eb37521eb61c5a525965dafaf308f21338aa44.png';
import img1 from '../assest/img/lips-c35ec4a3350ec779c6bf6a785981ad9ef2e21bd9fe26a2be1c766d56edb2e11f.png';
import img2 from '../assest/img/nail-polish-4c7ee1a5f7a5cbaff9757c3bcfa4f6e89d7a6f2ffc49d267e04e010ba94cfd7c.png';
import img3 from '../assest/img/single-pot-4ce398e7d8c527ef248ace7a783cc52fd583375a25a7dcdb7b16f7a0958ccb17.png';
import img4 from '../assest/img/eyeshadow-18fa4bed267bec6a67506150d9574259d0dcc67700e69de4ba720d9afe8204a2.png';
import "./Home.css"


function Home() {
    return (
        <>
            <div className="container-fluid">
                <h1 className='text-center py-5'>Makeup NYX</h1>
                <p className="description text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam cum illum soluta reprehenderit earum totam reiciendis
                    natus non officiis doloremque ex, quae iste, eos doloribus.</p>

                <div className="header-grid py-5">
                    <div className="photo"><img src={img} alt="Brushes" /></div>

                    <div className="photo photo-lips"><img src={img1} alt="Lips" /></div>

                    <div className="photo"><img src={img2} alt="nail" /></div>

                    <div className="photo"><img src={img3} alt="Single pot" /></div>

                    <div className="photo"><img src={img4} alt="Eyeshadow" /></div>
                </div>
            </div>

        </>
    )
}

export default Home;

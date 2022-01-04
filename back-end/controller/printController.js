const fs = require('fs');
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const { svg2png } = require('svg-png-converter');
const BSC = require('./basecontroller');
const CartsModel = require('../model/print_model').carts
const md5 = require('md5');

const { PDFURL, FONTSURL, IMAGEURL, CUSTOMER_KEY, CUSTOMER_SECRET, DOMAIN } = require('../db');

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
    url: 'https://www.waveable.co.uk',
    consumerKey: CUSTOMER_KEY,
    consumerSecret: CUSTOMER_SECRET,
    version: 'wc/v3'
});

exports.convertSvgToPdf = (svg, contentSize, textInfo) => {
    try {
        const file_name = md5(String(new Date().valueOf()));

        const doc = new PDFDocument({ size: contentSize });

        const pdf_name = `${PDFURL}${file_name}.pdf`;
        const stream = fs.createWriteStream(pdf_name)

        SVGtoPDF(doc, svg, 0, 0);

        stream.on('finish', function () {
        });

        doc.fontSize(textInfo.fontSize * 4.2)
            .font(`${FONTSURL}${textInfo.textFont}/font.ttf`)
            .fillColor(textInfo.textColor)
            .text(textInfo.displayText, textInfo.x + textInfo.fontSize, textInfo.y - textInfo.fontSize)

        doc.pipe(stream);
        doc.end();

        return `${file_name}.pdf`;
    } catch (err) {
        return false;
    }
}

exports.convertSvgToPng = async (svg, width, height) => {
    try {
        const preview_file_name = md5(String(new Date().valueOf()));
        const download_file_name = md5(String(new Date().valueOf()));

        let previewOutputBuffer = await svg2png({
            input: svg.trim(),
            encoding: 'buffer',
            format: 'jpeg',
            width: width,
            height: height,
            multiplier: 0.3,
            quality: 0.5
        })

        let downloadOutputBuffer = await svg2png({
            input: svg.trim(),
            encoding: 'buffer',
            format: 'jpeg',
            width: width,
            height: height,
            multiplier: 1,
            quality: 1.5
        })

        fs.writeFileSync(`${IMAGEURL}${preview_file_name}.png`, previewOutputBuffer)
        fs.writeFileSync(`${IMAGEURL}${download_file_name}.png`, downloadOutputBuffer)

        return {
            preview_img: `${preview_file_name}.png`,
            download_img: `${download_file_name}.png`
        };
    } catch (err) {
        return false;
    }
}

exports.addToCart = async (req, res) => {
    const { user_id, originalSvg, svg, contentSize, textInfo, printOption, printSize, printType, sizeName, price } = req.body;

    const { preview_img, download_img } = await this.convertSvgToPng(originalSvg, contentSize[0], contentSize[1]);
    const pdf_name = this.convertSvgToPdf(svg, contentSize, textInfo);
    if (!preview_img || !download_img || !pdf_name) {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    } else {
        var sdata = await BSC.data_save({ user_id, preview_img, download_img, pdf: pdf_name, print_option: printOption, print_size: printSize, price: price }, CartsModel);
        if (sdata) {
            const data = {
                name: printType + " " + sizeName,
                slug: sdata._id,
                regular_price: price.toString(),
                virtual: printType == "Digital Download" ? true : false,
                downloadable: true,
                downloads: [
                    {
                        id: md5(String(new Date().valueOf())),
                        name: printType + " - (PDF - Best Quality)",
                        file: DOMAIN + "pdf/" + pdf_name
                    },
                    {
                        id: md5(String(new Date().valueOf())),
                        name: printType + " - (PNG - Standard Quality)",
                        file: DOMAIN + "image/" + download_img
                    }
                ],
                reviews_allowed: false,
                catalog_visibility: "hidden",
                purchase_note: "This is a purchase note",
                images: [
                    {
                        // src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg",
                        src: DOMAIN + "image/" + preview_img,
                    }
                ],
            };

            WooCommerce.post("products", data)
                .then((response) => {
                    return res.json({
                        status: true,
                        data: response.data
                    })
                }).catch(err => {
                    return res.json({
                        status: false,
                        data: BSC.TEXT_SERVER_ERROR
                    })
                })
        } else {
            return res.json({
                status: false,
                data: BSC.TEXT_SERVER_ERROR
            })
        }
    }
}

exports.loadCartsByUserId = async (req, res) => {
    const { user_id } = req.body;
    var data = await CartsModel.find({ user_id }, '-pdf')
    if (data) {
        return res.json({
            status: true,
            data
        })
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    }
}
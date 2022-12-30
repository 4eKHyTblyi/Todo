import 'package:flutter/material.dart';
import 'package:messenger/widgets/drawer.dart';


class Podarok{
  String img;
  String name;
  int price;


  Podarok ({
    required this.name,
    required this.price,
    required this.img
  });
}



class ShopPage extends StatefulWidget {
  const ShopPage({Key? key}) : super(key: key);

  @override
  State<ShopPage> createState() => _ShopPageState();
}

class _ShopPageState extends State<ShopPage> {
  @override
  Widget build(BuildContext context) {

    final Podarki=<Podarok>[
      Podarok(name: 'name', price: 100, img: 'https://bumper-stickers.ru/43054-thickbox_default/podarok.jpg')
    ];

    return Stack(

      children: [
        Image.asset(
          "assets/fon.jpg",
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          fit: BoxFit.cover,
        ),
        Scaffold(

          backgroundColor: Colors.transparent,
          appBar: AppBar(
            centerTitle: true,
            backgroundColor: Colors.transparent,
            title: const Text("Магазин"),
          ),

          drawer: const MyDrawer(),

          body: LayoutBuilder(
            builder: (BuildContext context, BoxConstraints viewportConstraints) {
              return SingleChildScrollView(
                child: ConstrainedBox(
                  constraints: BoxConstraints(
                    minHeight: viewportConstraints.maxHeight,
                  ),
                  child: Column(
                    children: [
                      Column(
                        children: [
                          const Text("Подарки"),
                          Container(
                            height: 200,
                            child: ListView.builder(
                              scrollDirection: Axis.horizontal,
                              itemBuilder: (BuildContext context, Podarki.length){
                                return
                              },
                              itemCount: ,

                            ),
                          )
                        ],
                      )
                    ],
                  ),
                ),
              );
            }
          ),
        ),
      ],
    );
  }
}

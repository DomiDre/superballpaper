const initial_data = [
    {
        "x": new Float64Array([0.01191919191919192, 0.013838383838383839, 0.01575757575757576, 0.017676767676767676, 0.019595959595959597, 0.021515151515151515, 0.023434343434343433, 0.025353535353535354, 0.027272727272727275, 0.029191919191919193, 0.03111111111111111, 0.03303030303030303, 0.03494949494949495, 0.03686868686868687, 0.03878787878787879, 0.040707070707070706, 0.04262626262626263, 0.04454545454545455, 0.046464646464646465, 0.04838383838383838, 0.05030303030303031, 0.052222222222222225, 0.05414141414141414, 0.05606060606060606, 0.05797979797979798, 0.0598989898989899, 0.06181818181818182, 0.06373737373737373, 0.06565656565656565, 0.06757575757575758, 0.0694949494949495, 0.07141414141414142, 0.07333333333333333, 0.07525252525252525, 0.07717171717171717, 0.07909090909090909, 0.081010101010101, 0.08292929292929292, 0.08484848484848484, 0.08676767676767676, 0.08868686868686868, 0.0906060606060606, 0.09252525252525252, 0.09444444444444444, 0.09636363636363636, 0.09828282828282828, 0.1002020202020202, 0.10212121212121211, 0.10404040404040403, 0.10595959595959595, 0.10787878787878788, 0.1097979797979798, 0.11171717171717171, 0.11363636363636363, 0.11555555555555555, 0.11747474747474747, 0.11939393939393939, 0.1213131313131313, 0.12323232323232322, 0.12515151515151515, 0.12707070707070708, 0.128989898989899, 0.13090909090909092, 0.13282828282828282, 0.13474747474747475, 0.1366666666666667, 0.1385858585858586, 0.14050505050505052, 0.14242424242424243, 0.14434343434343436, 0.14626262626262626, 0.1481818181818182, 0.1501010101010101, 0.15202020202020203, 0.15393939393939396, 0.15585858585858586, 0.1577777777777778, 0.1596969696969697, 0.16161616161616163, 0.16353535353535353, 0.16545454545454547, 0.16737373737373737, 0.1692929292929293, 0.17121212121212123, 0.17313131313131314, 0.17505050505050507, 0.17696969696969697, 0.1788888888888889, 0.1808080808080808, 0.18272727272727274, 0.18464646464646464, 0.18656565656565657, 0.1884848484848485, 0.1904040404040404, 0.19232323232323234, 0.19424242424242424, 0.19616161616161618, 0.19808080808080808, 0.2]),
        "y": new Float64Array([427.5879141592992, 415.47650646351826, 401.93810073533564, 387.1172161692101, 371.1693439520171, 354.258477633637, 336.5545551340828, 318.23086373855597, 299.4614591320479, 280.41864802528056, 261.2705812874584, 242.1790008218473, 223.29717881750577, 204.7680826268207, 186.72279251380408, 169.27919306491904, 152.54095233218425, 136.59679596888822, 121.52007689917652, 107.36863460313364, 94.18493205448027, 81.99645285696371, 70.81633630545475, 60.64422404279601, 51.46728876249806, 43.26141306324634, 35.99248511044037, 29.61777719371172, 24.08737355463087, 19.34561494081497, 15.332529147460482, 11.985219245063922, 9.239184160435112, 7.02954966599155, 5.292191523740754, 3.9647364080574046, 2.9874301803997643, 2.3038670000978945, 1.8615765273475162, 1.6124700175057305, 1.513149342491358, 1.5250858425746714, 1.6146783622560035, 1.7532018249039922, 1.9166592352761602, 2.0855510645657414, 2.244576580412837, 2.382281857803446, 2.4906689799115824, 2.564780353327926, 2.6022711690234104, 2.6029818926724833, 2.568521322025787, 2.5018692619109117, 2.4070062950070636, 2.288576521852359, 2.1515875555048964, 2.001150528511126, 1.8422614398244672, 1.6796238678434106, 1.5175119265696786, 1.3596713617304208, 1.2092558823945267, 1.0687952044849522, 0.9401908430644124, 0.8247354225430582, 0.7231511657885696, 0.6356432587127112, 0.5619639477901415, 0.501483493872251, 0.4532644553886848, 0.41613618622902154, 0.3887668874733904, 0.3697310280704473, 0.3575704295978409, 0.35084777850574045, 0.3481917722071997, 0.3483335120229394, 0.3501341178729423, 0.3526038508388293, 0.3549132868361902, 0.35639728641878815, 0.35655265297917454, 0.3550304668345416, 0.35162412983951497, 0.34625415930471454, 0.3389507369701575, 0.32983495492424514, 0.31909961221706656, 0.30699030998858523, 0.29378747544778006, 0.2797898217778456, 0.2652996271920282, 0.25061009641516097, 0.23599495554689784, 0.2217003295129045, 0.20793886228131842, 0.19488596510860998, 0.18267801797402142]),
    },
    {
        "x": new Float64Array([0.01191919191919192, 0.013838383838383839, 0.01575757575757576, 0.017676767676767676, 0.019595959595959597, 0.021515151515151515, 0.023434343434343433, 0.025353535353535354, 0.027272727272727275, 0.029191919191919193, 0.03111111111111111, 0.03303030303030303, 0.03494949494949495, 0.03686868686868687, 0.03878787878787879, 0.040707070707070706, 0.04262626262626263, 0.04454545454545455, 0.046464646464646465, 0.04838383838383838, 0.05030303030303031, 0.052222222222222225, 0.05414141414141414, 0.05606060606060606, 0.05797979797979798, 0.0598989898989899, 0.06181818181818182, 0.06373737373737373, 0.06565656565656565, 0.06757575757575758, 0.0694949494949495, 0.07141414141414142, 0.07333333333333333, 0.07525252525252525, 0.07717171717171717, 0.07909090909090909, 0.081010101010101, 0.08292929292929292, 0.08484848484848484, 0.08676767676767676, 0.08868686868686868, 0.0906060606060606, 0.09252525252525252, 0.09444444444444444, 0.09636363636363636, 0.09828282828282828, 0.1002020202020202, 0.10212121212121211, 0.10404040404040403, 0.10595959595959595, 0.10787878787878788, 0.1097979797979798, 0.11171717171717171, 0.11363636363636363, 0.11555555555555555, 0.11747474747474747, 0.11939393939393939, 0.1213131313131313, 0.12323232323232322, 0.12515151515151515, 0.12707070707070708, 0.128989898989899, 0.13090909090909092, 0.13282828282828282, 0.13474747474747475, 0.1366666666666667, 0.1385858585858586, 0.14050505050505052, 0.14242424242424243, 0.14434343434343436, 0.14626262626262626, 0.1481818181818182, 0.1501010101010101, 0.15202020202020203, 0.15393939393939396, 0.15585858585858586, 0.1577777777777778, 0.1596969696969697, 0.16161616161616163, 0.16353535353535353, 0.16545454545454547, 0.16737373737373737, 0.1692929292929293, 0.17121212121212123, 0.17313131313131314, 0.17505050505050507, 0.17696969696969697, 0.1788888888888889, 0.1808080808080808, 0.18272727272727274, 0.18464646464646464, 0.18656565656565657, 0.1884848484848485, 0.1904040404040404, 0.19232323232323234, 0.19424242424242424, 0.19616161616161618, 0.19808080808080808, 0.2]),
        "y": new Float64Array([427.5879141592992, 415.47650646351826, 401.93810073533564, 387.1172161692101, 371.1693439520171, 354.258477633637, 336.5545551340828, 318.23086373855597, 299.4614591320479, 280.41864802528056, 261.2705812874584, 242.1790008218473, 223.29717881750577, 204.7680826268207, 186.72279251380408, 169.27919306491904, 152.54095233218425, 136.59679596888822, 121.52007689917652, 107.36863460313364, 94.18493205448027, 81.99645285696371, 70.81633630545475, 60.64422404279601, 51.46728876249806, 43.26141306324634, 35.99248511044037, 29.61777719371172, 24.08737355463087, 19.34561494081497, 15.332529147460482, 11.985219245063922, 9.239184160435112, 7.02954966599155, 5.292191523740754, 3.9647364080574046, 2.9874301803997643, 2.3038670000978945, 1.8615765273475162, 1.6124700175057305, 1.513149342491358, 1.5250858425746714, 1.6146783622560035, 1.7532018249039922, 1.9166592352761602, 2.0855510645657414, 2.244576580412837, 2.382281857803446, 2.4906689799115824, 2.564780353327926, 2.6022711690234104, 2.6029818926724833, 2.568521322025787, 2.5018692619109117, 2.4070062950070636, 2.288576521852359, 2.1515875555048964, 2.001150528511126, 1.8422614398244672, 1.6796238678434106, 1.5175119265696786, 1.3596713617304208, 1.2092558823945267, 1.0687952044849522, 0.9401908430644124, 0.8247354225430582, 0.7231511657885696, 0.6356432587127112, 0.5619639477901415, 0.501483493872251, 0.4532644553886848, 0.41613618622902154, 0.3887668874733904, 0.3697310280704473, 0.3575704295978409, 0.35084777850574045, 0.3481917722071997, 0.3483335120229394, 0.3501341178729423, 0.3526038508388293, 0.3549132868361902, 0.35639728641878815, 0.35655265297917454, 0.3550304668345416, 0.35162412983951497, 0.34625415930471454, 0.3389507369701575, 0.32983495492424514, 0.31909961221706656, 0.30699030998858523, 0.29378747544778006, 0.2797898217778456, 0.2652996271920282, 0.25061009641516097, 0.23599495554689784, 0.2217003295129045, 0.20793886228131842, 0.19488596510860998, 0.18267801797402142]),
    }
]

export default initial_data;
​

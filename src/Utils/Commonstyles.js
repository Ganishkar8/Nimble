/* eslint-disable prettier/prettier */
import Colors from './Colors';
export default {
  circularView: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldtextStyle: {
    color: Colors.darkblack,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold'
  },
  inputtextStyle: {
    color: Colors.darkblack,
    fontSize: 13,
    paddingHorizontal: 0,
    fontFamily: 'PoppinsRegular'
  },
  inputtextStyle2: {
    color: Colors.darkblack,
    fontSize: 13,
    paddingHorizontal: 0,
    fontWeight: '400',
  },
  textinputtextStyle: {
    width: '90%',
    fontSize: 15,
    fontFamily: 'PoppinsRegular',
    minHeight: 43,
    color: Colors.black
  },
  HeaderStyle: {
    width: '90%',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 0,
    color: '#000000',
  },
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontFamily: 'PoppinsRegular'
  },
  item: {
    backgroundColor: '#EBECEB',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    marginVertical: 8,
    marginHorizontal: 16,
    color: '#000000',
  },
  buttonView: {
    width: '100%',
    height: 50,
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: Colors.white, fontSize: 14, fontFamily: 'Poppins-SemiBold', letterSpacing: 0.5
  },
  buttonViewInnerStyle: {
    width: '88%',
    height: 50,
    backgroundColor: Colors.darkblue,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonViewBorderStyle: {
    width: '60%',
    height: 45,
    borderWidth: 1,
    borderColor: Colors.darkblue,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentView: {
    flex: 1,
    backgroundColor: Colors.lightwhite,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 50,
    flexGrow: 1,
  },
  line: {
    backgroundColor: '#dbdbdb', // Change the color as needed
    height: 1,
    width: '90%',
    marginTop: '5%', // Adjust the height as needed
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  disableBg: {
    width: '88%', height: 50, backgroundColor: Colors.disableBg,
    borderRadius: 45, alignItems: 'center', justifyContent: 'center'
  },
};

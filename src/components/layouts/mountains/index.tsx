import styles from './index.module.scss';
import React from 'react';


export interface MountainsProps{
  top?:number;
  left?:number;
  right?:number;
  bottom?:number;
  height?:number;
  width?:number;

}

const Mountains = ({
  top,
  left,
  right,
  bottom,
  height,
  width,
                   }: MountainsProps) => {

  let style = {

  } as any;
  if(top){
    style['top'] = top.toString()+"px";
  }
  if(left){
    style['left'] = left.toString()+"px";
  }
  if(right){
    style['right'] = right.toString()+"px";
  }
  if(bottom){
    style['bottom'] = bottom.toString()+"px";
  }
  if(height){
    style['height'] = height.toString()+"px";
  }
  if(width){
    style['width'] = width.toString()+"px";
  }

  return <div className={styles.mountains} style={style}></div>

}
export default Mountains;
